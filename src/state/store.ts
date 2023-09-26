import { configureStore } from "@reduxjs/toolkit";
import chatboxReducer from "./chat/ChatboxSlice";
import themeReducer from "./settings/themeSlice";
import customThemeSlice from "./settings/customThemeSlice";
import userReducer from "./userSlice";


const store = configureStore({
    reducer:{
        user: userReducer,
        chatbox: chatboxReducer,
        theme: themeReducer,
        customTheme: customThemeSlice
    }

})

export default store

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch