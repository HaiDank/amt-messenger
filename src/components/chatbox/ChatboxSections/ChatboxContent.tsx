import React, { memo, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/useAppRedux';
import ChatMessage from './ChatMessage';
import useIntersectionObserver from '../../../hooks/useIntersectionObserver';
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
} from '../../../state/chat/messageSlice';
import { db } from '../../../config/firebase';
const ChatboxContent: React.FC = () => {
	const dispatch = useAppDispatch();
	const messages = useAppSelector((state) => state.messages.messages);
	const messageState = useAppSelector((state) => state.messages);
	const chosenChatboxId = useAppSelector(
		(state) => state.messages.chosenChatbox?.chatboxId!
	);

	// state

	const [isLoading, setIsLoading] = useState(false);
	const [hasNext, setHasNext] = useState(true);
	const [lastMessage, setLastMessage] = useState<DocumentData | null>(null);

	// ref
	const messagesRef = collection(db, `chat-box/${chosenChatboxId}/messages`);
	const autoScrollElement = useRef<HTMLDivElement>(null);

	const fetchMessages = () => {
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

				console.log(
					'fetch message snap',
					messageSnapshot.docs[messageSnapshot.docs.length - 1]
				);

				console.log('data', data);

				if (data.length > 0) {
					data[data.length - 1] = {
						...data[data.length - 1],
						isDevided: true,
						isTimeStamped: true,
						chatBorderOrder: 0,
					};
					for (let index = data.length - 1; index >= 0; index--) {
						const message = data[index];

						const timeSent = message.createdAt;
						let isDevided = null;
						let isTimeStamped = null;
						let chatBorderOrder = 0;

						if (index !== data.length - 1) {
							const prevMessage = data[index + 1];

							if (prevMessage.createdAt <= timeSent - 80000) {
								isDevided = true;

								if (
									prevMessage.createdAt <=
									timeSent - 900000
								) {
									isTimeStamped = true;
								}
							} else if (prevMessage.uid === message.uid) {
								chatBorderOrder = 2;

								prevMessage.chatBorderOrder += 1;
							}

							data[index] = {
								...message,
								isDevided: isDevided,
								isTimeStamped: isTimeStamped,
								chatBorderOrder: chatBorderOrder,
							} as MessageType;
						}
					}

					dispatch(loadMessages(data));
				}
			}
		});
		setIsLoading(false);

		return unsubscribe;
	};

	const prevMessages = () => {
		setIsLoading(true);

		const q = query(
			messagesRef,
			orderBy('createdAt', 'desc'),
			limit(15),
			startAfter(lastMessage)
		);

		getDocs(q).then((messageSnapshot) => {
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
					data[data.length - 1] = {
						...data[data.length - 1],
						isDevided: true,
						isTimeStamped: true,
						chatBorderOrder: 0,
					};
					for (let index = data.length - 1; index >= 0; index--) {
						const message = data[index];

						const timeSent = message.createdAt;
						let isDevided = null;
						let isTimeStamped = null;
						let chatBorderOrder = 0;

						if (index !== data.length - 1) {
							const prevMessage = data[index + 1];

							if (prevMessage.createdAt <= timeSent - 80000) {
								isDevided = true;

								if (
									prevMessage.createdAt <=
									timeSent - 900000
								) {
									isTimeStamped = true;
								}
							} else if (prevMessage.uid === message.uid) {
								chatBorderOrder = 2;

								prevMessage.chatBorderOrder += 1;
							}

							data[index] = {
								...message,
								isDevided: isDevided,
								isTimeStamped: isTimeStamped,
								chatBorderOrder: chatBorderOrder,
							} as MessageType;
						}
					}

					dispatch(addMessages(data));
				} else {
					setHasNext(false);
				}

				if (messageSnapshot.docs.length < 15) {
					setHasNext(false);
				}
			} else {
				setHasNext(false);
			}
		});
		setIsLoading(false);
	};

	const lastMessageRef = useIntersectionObserver<HTMLDivElement>(() => {
		if (!isLoading && hasNext && lastMessage) {
			console.log('prevMessages');
			prevMessages();
		}
	}, [!isLoading, hasNext]);

	useEffect(() => {
		const unsubscribe = fetchMessages();


		window.addEventListener('beforeunload', () => {
			if (unsubscribe) {
				unsubscribe();
			}
		});

		return () => {
			if (unsubscribe) {
				unsubscribe();
			}
		};
	}, []);

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
			{messages.map((message, index, messages) => (
				<div key={index}>
					<ChatMessage
						message={message}
						ref={
							index === messages.length - 1
								? lastMessageRef
								: null
						}
					/>
				</div>
			))}
		</section>
	);
};

export default memo(ChatboxContent);
