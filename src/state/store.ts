import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./settings/themeSlice";
import customThemeSlice from "./settings/customThemeSlice";
import userReducer from "./userSlice";
import chatappReducer from "./chat/chatappSlice";
import messageReducer from "./chat/messageSlice";


const store = configureStore({
    reducer:{
        messages: messageReducer,
        user: userReducer,
        chatapp: chatappReducer,
        theme: themeReducer,
        customTheme: customThemeSlice,
    }

})

export default store

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch