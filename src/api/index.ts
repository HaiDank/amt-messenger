import {
	collection,
	doc,
	getDoc,
	limit,
	onSnapshot,
	orderBy,
	query,
	where,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { ChatboxType, addChatapp } from '../state/chat/chatappSlice';
import { UserType } from '../state/userSlice';
import { AppDispatch } from '../state/store';
import { MessageType, loadMessages } from '../state/chat/messageSlice';

const chatBoxRef = collection(db, 'chat-box');
const PAGE_SIZE = 15;

export const fetchChatBoxes = (dispatch: AppDispatch, uid: string) => {
	const chatBoxQuery = query(
		chatBoxRef,
		where('usersId', 'array-contains', uid),
		orderBy('latestMessage.createdAt', 'desc')
	);

	const unsubscribe = onSnapshot(chatBoxQuery, async (chatSnapshot) => {
		let data: ChatboxType[] = [];

		// chatSnapshot.docs.map( (docSnapshot) => {
		for (const docSnapshot of chatSnapshot.docs) {
			const otherUserId = docSnapshot
				.data()
				.usersId.find((id: string) => id !== uid);

			const userRef = doc(db, 'users', otherUserId);

			let user = null;

			const userSnapshot = await getDoc(userRef);

			if (userSnapshot.exists()) {
				user = {
					name: userSnapshot.data().name,
					avatarUrl: userSnapshot.data().avatarUrl,
					online: userSnapshot.data().online,
					timeLastOnline: userSnapshot
						.data()
						.timeLastOnline.toDate()
						.getTime(),
					uid: userSnapshot.id,
				} as UserType;
			}

			console.log(user);
			let chatbox = {
				...docSnapshot.data(),
				chatboxId: docSnapshot.id,
				latestMessage: {
					...docSnapshot.data().latestMessage,
					createdAt: docSnapshot
						.data()
						.latestMessage.createdAt.toDate()
						.getTime(),
				},
				otherUser: user,
			} as ChatboxType;
			console.log(chatbox);
			data.push(chatbox);
		}
		dispatch(addChatapp(data));
	});

	return unsubscribe;
};

export const fetchMessages = (
	dispatch: AppDispatch,
	chosenChatboxId: string
) => {
	const messagesRef = collection(db, `chat-box/${chosenChatboxId}/messages`);

	let q = query(messagesRef, orderBy('createdAt', 'desc'), limit(PAGE_SIZE));

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

			if (data.length > 0) {
				dispatch(loadMessages(data.reverse()));
			}
		}
	});
	return unsubscribe;
};

