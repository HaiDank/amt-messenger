import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./settings/themeSlice";
import customThemeSlice from "./settings/customThemeSlice";
import userReducer from "./userSlice";
import chatappReducer from "./chat/chatappSlice";
import messageReducer from "./chat/messageSlice";
import fileViewReducer from "./chat/fileViewSlice";
import viewPortReducer from "./chat/viewPortSlice";


const store = configureStore({
    reducer:{
        messages: messageReducer,
        user: userReducer,
        chatapp: chatappReducer,
        theme: themeReducer,
        fileView: fileViewReducer,
        viewPort: viewPortReducer,
        customTheme: customThemeSlice,
    }

})

export default store

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch