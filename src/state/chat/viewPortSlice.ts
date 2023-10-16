import { PayloadAction, createSlice } from '@reduxjs/toolkit';


 type ViewPortType = {
	width: number;
    height: number;
};

let initialState: ViewPortType = {
	width: window.innerWidth, 
    height: window.innerHeight,
}


const viewPortSlice = createSlice({
	name: 'viewPort',
	initialState,
	reducers: {
		setScreenSize: (state, action: PayloadAction<{width: number,height: number}>) => {
            state.width = action.payload.width;
            state.height = action.payload.height;
          },
	},
});

export const { setScreenSize } = viewPortSlice.actions;

export default viewPortSlice.reducer;
