import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
	Timestamp,
	addDoc,
	collection,
	doc,
	updateDoc,
} from 'firebase/firestore';
import { db } from '../../config/firebase';
import { ChatboxType } from './chatappSlice';

export type MessageType = {
	text: string;
	createdAt: number;
	uid: string;
	reaction: string[] | null;
	mediaUrl: string | null;
	mediaType: string | null;
	removeFromUID: string[] | null;
	isUnsent: boolean | null;
	isDevided: boolean | null;
	isTimeStamped: boolean | null;
	chatBorderOrder: number;
	messageId: string;
};

type MessageSliceType = {
	messages: MessageType[];
	chosenChatbox: ChatboxType | null;
	posting: boolean,
};

const initialState: MessageSliceType = {
	messages: [],
	chosenChatbox: null,
	posting: false,
};

export const postMessage = createAsyncThunk(
	'postMessage',
	async (args: {
		message: Omit<MessageType, 'messageId' | 'createdAt'>;
		chosenChatboxId: string | null;
		createdAt: number;
	}) => {
		try {
			const { message, chosenChatboxId, createdAt } = args;
			const messageRef = collection(
				db,
				`chat-box/${chosenChatboxId}/messages`
			);
			const chatboxRef = doc(db, `chat-box/${chosenChatboxId}`);

			const newMessage = {
				createdAt: Timestamp.fromDate(new Date(createdAt)),
				...message,
			};

			await updateDoc(chatboxRef, {
				latestMessage: newMessage,
			});
			await addDoc(messageRef, newMessage);

		} catch (error) {
			console.log(error);
		}
	}
);

// const updateChatBubbleOrderAPI = createAsyncThunk(
// 	'updateChatBubbleOrderAPI',
// 	async (
// 		args: { order: number; messageId: string; index: number },
// 		thunkAPI
// 	) => {
// 		try {
// 			const { order, messageId, index } = args;
// 			const { dispatch, getState } = thunkAPI;
// 			const state = getState() as RootState;
// 			const messageRef = doc(
// 				db,
// 				`chat-box/${state.messages.chosenChatbox?.chatboxId}/messages`,
// 				messageId
// 			);

// 			updateDoc(messageRef, {
// 				chatBorderOrder: order,
// 			});

// 			dispatch(updateChatBubbleOrder({ index, order }));
// 		} catch (error) {
// 			console.log(error);
// 		}
// 	}
// );



const messageSlice = createSlice({
	name: 'messages',
	initialState,
	reducers: {
		loadMessages: (state, action: PayloadAction<MessageType[]>) => {
			state.messages = action.payload;
		},
		addMessages: (state, action: PayloadAction<MessageType[]>) => {
			state.messages = [...state.messages, ...action.payload];
		},
	
		updateChatBubbleOrder: (
			state,
			action: PayloadAction<{ index: number; order: number}>
		) => {
			const { index, order } = action.payload;
			state.messages[index].chatBorderOrder = order;
		},
		setChosenChatbox: (state, action: PayloadAction<ChatboxType | null>) => {
			state.chosenChatbox = action.payload

		},
	},
	extraReducers: (builder) => {
		builder.addCase(postMessage.pending, (state) => {
			state.posting = true;
		});
		builder.addCase(postMessage.fulfilled, (state) => {
			state.posting = false;
		});
		builder.addCase(postMessage.rejected, (state, action) => {
			state.posting = false;
			console.log(action);
		});
	},
});

export const {
	addMessages,
	loadMessages,
	updateChatBubbleOrder,
	setChosenChatbox,
} = messageSlice.actions;

export default messageSlice.reducer;
