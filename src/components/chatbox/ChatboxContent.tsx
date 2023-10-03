import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppRedux';
import ChatMessage from './ChatMessage';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import {
	DocumentData,
	collection,
	getDocs,
	limit,
	onSnapshot,
	orderBy,
	query,
	startAfter,
} from 'firebase/firestore';
import {
	MessageType,
	addMessages,
	loadMessages,
} from '../../state/chat/messageSlice';
import { db } from '../../config/firebase';

const ChatboxContent: React.FC = () => {
	const autoScrollElement = useRef<HTMLDivElement>(null);
	const dispatch = useAppDispatch();
	const messages = useAppSelector((state) => state.messages.messages);
	const messageState = useAppSelector((state) => state.messages);

	const [isLoading, setIsLoading] = useState(false);
	const [hasNext, setHasNext] = useState(true);
	const [lastMessage, setLastMessage] = useState<DocumentData | null>(null);

	const chosenChatboxId = useAppSelector(
		(state) => state.messages.chosenChatboxId
	);
	const messagesRef = collection(db, `chat-box/${chosenChatboxId}/messages`);

	const fetchMessages = useCallback(() => {
		setIsLoading(true);
		const q = query(messagesRef, orderBy('createdAt', 'desc'), limit(15));

		const unsubscribe = onSnapshot(q, (messageSnapshot) => {
			if (!messageSnapshot.empty) {
				let data: MessageType[] = [];

				messageSnapshot.docs.forEach((doc) => {
					if (doc && doc.data().createdAt)
						data.push({
							...doc.data(),
							messageId: doc.id,
							createdAt: doc.data().createdAt.toDate().getTime(),
						} as MessageType);
				});

				setLastMessage(
					messageSnapshot.docs[messageSnapshot.docs.length - 1]
				);

		console.log(lastMessage)


				if (data.length > 0) {
					dispatch(loadMessages(data));
				}
			}
		});
		setIsLoading(false);

		return unsubscribe;
	}, []);

	const fetchNextMessages = useCallback(() => {
		setIsLoading(true);

		const q = query(
			messagesRef,
			orderBy('createdAt', 'desc'),
			limit(15),
			startAfter(lastMessage)
		);
		console.log('1233', lastMessage)

		getDocs(q).then((messageSnapshot) => {
		console.log('1233', messageSnapshot.empty)

			if (!messageSnapshot.empty) {
				let data: MessageType[] = [];

				messageSnapshot.docs.forEach((doc) => {
					if (doc && doc.data().createdAt)
						data.push({
							...doc.data(),
							messageId: doc.id,
							createdAt: doc.data().createdAt.toDate().getTime(),
						} as MessageType);
				});

				setLastMessage(
					messageSnapshot.docs[messageSnapshot.docs.length - 1]
				);

				if (data.length > 0) {
					dispatch(addMessages(data));
				} else {
					setHasNext(false);
				}

				if (messageSnapshot.docs.length < 15) {
					setHasNext(false);
				}
				console.log('asdasdawdasd', data);
			}
		});
		setIsLoading(false);

	}, [lastMessage]);

	const lastMessageRef = useIntersectionObserver<HTMLDivElement>(() => {
		if (!isLoading && hasNext && lastMessage) {
			console.log('loadNextMessages');
			fetchNextMessages();
			
		}
	}, [!isLoading, hasNext]);

	useEffect(() => {
		const unsubscribe = fetchMessages();
		console.log(lastMessage)
		return () => {
			if (unsubscribe) {
				unsubscribe();
			}
		};
	}, [chosenChatboxId, dispatch]);

	useEffect(() => {
		if (autoScrollElement.current) {
			autoScrollElement.current.scrollTop =
				autoScrollElement.current.scrollHeight;
		}
	}, [messageState.posting]);

	return (
		<section
			ref={autoScrollElement}
			className={`relative flex flex-col-reverse flex-auto gap-[3px] px-4 pt-2 overflow-y-auto overflow-x-hidden scroll-smooth`}
		>
			{messages.map((message, index,messages) => (
				<ChatMessage
					key={message.messageId}
					message={message}
					ref={index === messages.length - 1 ? lastMessageRef : null}
				/>
			))}
		</section>
	);
};

export default memo(ChatboxContent);
