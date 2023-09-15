import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';


export type messageType = {
    message: string,
    sender: string,
    receiver: string,
    timeStamp: number, 
}

const initialState = {
    message: '',
    sender: '',
    receiver: '',
    timeStamp: Date.now(),
}

export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {

    }
})