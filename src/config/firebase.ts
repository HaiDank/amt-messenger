


import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const app = initializeApp({
	apiKey: 'AIzaSyB99kLPH6SwcgqLjAxiM5ebxE4cp1HICJU',
	authDomain: 'chatappmsgclone.firebaseapp.com',
	projectId: 'chatappmsgclone',
	storageBucket: 'chatappmsgclone.appspot.com',
	messagingSenderId: '293987343073',
	appId: '1:293987343073:web:48299d29ca16666c9535a0',
	measurementId: 'G-K1W4SFJ85Y',
});

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);