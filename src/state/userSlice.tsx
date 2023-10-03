import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
	Timestamp,
	doc,
	getDoc,
	setDoc,
	updateDoc,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { RootState } from './store';

export type UserType = {
	uid: string | null;
	name: string | null;
	avatarUrl: string | null;
	online: boolean;
    timeLastOnline?: number;
};

const user = sessionStorage.getItem('user');
console.log(user);
let initialState: UserType = {
	online: false,
	uid: null,
	name: null,
	avatarUrl: null,
};

if (user) {
	const parseUser = JSON.parse(user);
	console.log(parseUser);
	initialState = {
		online: true,
		uid: parseUser.uid,
		name: parseUser.name,
		avatarUrl: parseUser.avatarUrl,
	};
}

export const updateUserStatus = createAsyncThunk(
	'updateUserStatus',
	async (
		_,
		thunkAPI
	) => {
		const { getState } = thunkAPI;

		const state = getState() as RootState

		const { name, uid, avatarUrl, online } = state.user;

		const userRef = doc(db, 'users', uid!);
		const timeLastOnline = Timestamp.fromDate(new Date());
		const userSnapshot = await getDoc(userRef);

		if (userSnapshot.exists()) {
			await updateDoc(userRef, {
				online: online,
				timeLastOnline: timeLastOnline,
			});
		} else {
			await setDoc(userRef, {
				name: name,
				avatarUrl: avatarUrl,
				online: online,
				timeLastOnline: timeLastOnline,
			});

		}


	}
);

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action) => {
			const { name, uid, avatarUrl } = action.payload;
			state.avatarUrl = avatarUrl;
			state.name = name;
			state.uid = uid;
			state.online = true;
			sessionStorage.setItem('user', JSON.stringify(state));
		},
		mySignOut: (state) => {
			state.online = false;
			sessionStorage.removeItem('user');
		},
		updateStatus: (state, action) => {
			state.online = action.payload
		}
	},
});

export const { setUser, mySignOut,updateStatus } = userSlice.actions;

export default userSlice.reducer;
