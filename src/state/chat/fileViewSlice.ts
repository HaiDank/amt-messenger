import { PayloadAction, createSlice } from '@reduxjs/toolkit';


 type FileViewType = {
	openFileView: boolean;
};

let initialState: FileViewType = {
	openFileView: false
};



const fileViewSlice = createSlice({
	name: 'fileView',
	initialState,
	reducers: {
		setOpenFileView: (state, action: PayloadAction<boolean>) => {
            state.openFileView = action.payload
        }
	},
});

export const { setOpenFileView } = fileViewSlice.actions;

export default fileViewSlice.reducer;
