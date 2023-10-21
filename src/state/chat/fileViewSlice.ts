import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ChatboxType } from './chatappSlice';

export type FileInfo = {
	name: string;
	url: string;
	size: number;
	fileType: string;
	createdAt: number;
  }


 type FileViewType = {
	openFileView: boolean;
	fileList: FileInfo[];
	status: 'idle' | 'loading' | 'failed';
	chosenChatboxFileView: ChatboxType | null;
	chosenFileIndex: number;
	chosenUrl:string | null;
};

let initialState: FileViewType = {
	openFileView: false,
	fileList: [],
	status: 'idle',
	chosenChatboxFileView: null,
	chosenFileIndex: -1,
	chosenUrl: null
};



const fileViewSlice = createSlice({
	name: 'fileView',
	initialState,
	reducers: {
		setOpenFileView: (state, action: PayloadAction<boolean>) => {
            state.openFileView = action.payload
        },
		loadFiles: (state, action:PayloadAction<FileInfo[]>) =>{
			state.fileList = action.payload
			const index = action.payload.findIndex(file => file.url === state.chosenUrl)
			console.log(index)
			state.chosenFileIndex = index
		},
		addFiles: (state, action: PayloadAction<FileInfo[]>) => {
			const newList = [...state.fileList, ...action.payload]

			state.fileList = newList
		},
		wipeFetchedFiles: (state) => {
			state.fileList = []
			state.status = 'idle'
		},
		setChosenChatboxFileView: (state, action: PayloadAction<ChatboxType>) => {
			state.chosenChatboxFileView = action.payload
		},
		setChosenFileIndex: (state, action:PayloadAction<number>)=>{
			state.chosenFileIndex = action.payload
		},
		setChosenFileUrl: (state, action:PayloadAction<string>)=>{
			state.chosenUrl = action.payload
		}
	},
});

export const { setOpenFileView, addFiles, wipeFetchedFiles, setChosenChatboxFileView, setChosenFileIndex, setChosenFileUrl, loadFiles } = fileViewSlice.actions;

export default fileViewSlice.reducer;
