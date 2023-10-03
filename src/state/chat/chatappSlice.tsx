import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import {
// 	collection,
// 	doc,
// 	getDoc,
// 	onSnapshot,
// 	orderBy,
// 	query,
// 	where,
// } from 'firebase/firestore';
// import { db } from '../../hooks/useFirebase';
import { MessageType } from './messageSlice';
// import { RootState } from '../store';
import { UserType } from '../userSlice';

// const chatBoxRef = collection(db, 'chat-box');

export type ChatboxType = {
	isGroup: boolean;
	isRead: boolean;
	usersId: string[];
	chatboxId: string;
	latestMessage: MessageType | null;
	otherUser: UserType | null;
};

export type ChatappType = {
	chatboxes: ChatboxType[];
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: string | null;
};

const initialState: ChatappType = {
	chatboxes: [],
	status: 'idle',
	error: null,
};

/** const fetchChatBoxes = createAsyncThunk(
	'fetchChatBoxes',
	async (_, thunkAPI) => {
		const { dispatch, getState } = thunkAPI;

		const state = getState() as RootState;

		const chatBoxQuery = query(
			chatBoxRef,
			where('usersId', 'array-contains', state.user.uid),
			orderBy('latestMessage.createdAt', 'desc')
		);

		onSnapshot(chatBoxQuery, (chatSnapshot) => {
			let data: ChatboxType[] = [];

			chatSnapshot.docs.map((docSnapshot) => {
				const otherUserId = docSnapshot
					.data()
					.usersId.find((uid: string) => uid != state.user.uid);
				const userRef = doc(db, 'users', otherUserId);

				let user = null;
				
				getDoc(userRef).then((userSnapshot) => {

					if (userSnapshot.exists()) {
						const data = userSnapshot.data();
						user = {
							name: data.name,
							avatarUrl: data.avatarUrl,
							online: data.online,
							timeLastOnline: data.timeLastOnline,
							uid: userSnapshot.id,
						} as UserType;
					}
				});

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
			});
			dispatch(addChatapp(data));
		});

		return 0;
	}
); **/

export const chatappSlice = createSlice({
	name: 'chatapp',
	initialState,
	reducers: {
		addChatbox: (state, action: PayloadAction<ChatboxType>) => {
			state.chatboxes.push(action.payload);
		},
		addChatapp: (state, action: PayloadAction<ChatboxType[]>) => {
			state.chatboxes = action.payload;
		},
	},
	// extraReducers: (builder) => {
	// 	builder.addCase(fetchChatBoxes.pending, (state) => {
	// 		state.status = 'loading';
	// 	});
	// 	builder.addCase(fetchChatBoxes.fulfilled, (state, action) => {
	// 		state.status = 'succeeded';
	// 		console.log(action);
	// 	});
	// 	builder.addCase(fetchChatBoxes.rejected, (action) => {
	// 		console.log(action);
	// 	});
	// },
});

export const { addChatbox, addChatapp } = chatappSlice.actions;

export default chatappSlice.reducer;
