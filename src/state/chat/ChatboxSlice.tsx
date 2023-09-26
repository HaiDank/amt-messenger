import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

const BASEURL = 'https://64b390920efb99d862680207.mockapi.io/';
const METHOD_GET = {
	method: 'GET',
	headers: { 'content-type': 'application/json' },
};
const METHOD_DELETE = {
	method: 'DELETE',
};
const METHOD_PUT = (value) => {
	return {
		method: 'PUT',
		body: JSON.stringify(value),
		headers: { 'content-type': 'application/json' },
		credentials: 'same-origin',
	};
};

type chatboxType = {
	messages: MessageType[];
	chatboxId: string;
	isRead: boolean;
	isGroup: boolean;
};

export type MessageType = {
	text: string;
	timeCreated: number;
	uid: number;
	messageId: number;
	reaction?: string;
	mediaUrl?: string;
	removeFromUID?: number[];
	isUnsent?: boolean;
	isDevided?: boolean;
	isTimeStamped?: boolean;
	chatBorderOrder?: number;
};

type chatboxStateType = {
	loading: boolean;
	chatDatas: chatboxType[];
	error?: string;
	chosenChatboxId: string;
};

const initialState: chatboxStateType = {
	loading: false,
	chatDatas: [],
	chosenChatboxId: '1',
	error: '',
};

export const fetchChatDatas = createAsyncThunk('fetchChatDatas', async () => {
	const response = await fetch(BASEURL + 'chatAppData', METHOD_GET);
	return response.json();
});

export const saveChatDatas = createAsyncThunk<any, void, { state: RootState }>(
	'saveChatDatas',
	async (_, thunkAPI) => {
		const chosenChatboxId = thunkAPI.getState().chatbox.chosenChatboxId;
		const chatData = thunkAPI.getState().chatbox.chatDatas.find((chat) => chat.chatboxId === chosenChatboxId);
		const response = await fetch(
			BASEURL + 'chatAppData/' + chosenChatboxId,
			{
				method: 'PUT',
				body: JSON.stringify(chatData),
				headers: { 'content-type': 'application/json' },
				credentials: 'same-origin',
			}
		)
			.then((response) => {
				if (!response.ok) {
					throw new Error(`HTTP Status: ${response.status}`);
				}
				return response.json;
			})
			.catch((error) => console.log(error.message));
		return response;
	}
);

export const chatboxSlice = createSlice({
	name: 'chatbox',
	initialState,
	reducers: {
		addMessage: (state, action: PayloadAction<MessageType>) => {
			const index = state.chatDatas.findIndex(
				(chat) => chat.chatboxId === state.chosenChatboxId
			);
			state.chatDatas[index].messages.push(action.payload);
		},
		removeMessage: (
			state,
			action: PayloadAction<{ uid: number; messageId: number }>
		) => {
			const index = state.chatDatas.findIndex(
				(chat) => chat.chatboxId === state.chosenChatboxId
			);
			const message = state.chatDatas[index].messages.find(
				(message) => message.messageId === action.payload.messageId
			);
			if (message) {
				if (!message?.removeFromUID) {
					message.removeFromUID = [];
				}
				message.removeFromUID.push(action.payload.uid);
			}
		},
		updateChatBubbleOrder: (state, action: PayloadAction<number>) => {
			const index = state.chatDatas.findIndex(
				(chat) => chat.chatboxId === state.chosenChatboxId
			);
			state.chatDatas[index].messages[
				state.chatDatas[index].messages.length - 1
			].chatBorderOrder = action.payload;
		},
		updateChosenChatbox: (state, action: PayloadAction<number>) => {
			state.chosenChatboxId = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchChatDatas.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(fetchChatDatas.fulfilled, (state, action) => {
			state.loading = false;
			state.chatDatas = action.payload;
		});
		builder.addCase(fetchChatDatas.rejected, (state, action) => {
			state.loading = true;
			console.log('error: ', action);
		});
	},
});

export const selectChatbox = (state: RootState) =>
	state.chatbox.chatDatas.find(
		(chat) => chat.chatboxId === state.chatbox.chosenChatboxId
	);

export const {
	addMessage,
	removeMessage,
	updateChatBubbleOrder,
	updateChosenChatbox,
} = chatboxSlice.actions;

export default chatboxSlice.reducer;
