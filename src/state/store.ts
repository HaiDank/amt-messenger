import { configureStore } from "@reduxjs/toolkit";
import chatboxReducer from "./chat/ChatboxSlice";

const store = configureStore({
    reducer:{
        chatbox: chatboxReducer,
    }

})

export default store

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch