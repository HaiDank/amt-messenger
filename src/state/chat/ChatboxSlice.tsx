import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { messagesData } from '../../dummyData';

type chatboxType = {
	messages: MessageType[];
	chatboxId: number;
	isRead: boolean;
	isGroup?: boolean;

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

const initialState: chatboxType = {
	messages: messagesData,
	chatboxId: 1,
	isGroup: false,
	isRead: false,
};

export const chatboxSlice = createSlice({
	name: 'chatbox',
	initialState,
	reducers: {
		addMessage: (state, action: PayloadAction<MessageType>) => {
			state.messages.push(action.payload);

		},
		removeMessage: (
			state,
			action: PayloadAction<{ uid: number; messageId: number }>
		) => {
			const message = state.messages.find(
				(message) => message.messageId === action.payload.messageId
			);
			if (message) {
				if (!message?.removeFromUID) {
					message.removeFromUID = [];
				}
                message.removeFromUID.push(action.payload.uid);
			}
		},
		updateChatBubbleOrder: ( state, action: PayloadAction<number>) => {
			state.messages[state.messages.length - 1].chatBorderOrder = action.payload
		}
	},
});

export const {addMessage, removeMessage, updateChatBubbleOrder} = chatboxSlice.actions;



export default chatboxSlice.reducer;
