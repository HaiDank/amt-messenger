import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";


export type UserType = {
    uid: number,
    name: string,
    avatarURL?: string,
    online: boolean,
    timeSinceLastOnline?: number,
}

const initialState: UserType = {
    uid: 1,
    name: 'Vũ Ngọc Hải Đăng',
    online: true,
    avatarURL: './src/assets/admin-avatar.png'
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    }
})


export default userSlice.reducer