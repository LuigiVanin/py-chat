import { configureStore } from "@reduxjs/toolkit";

import chatReducer from "./chatSlice";
import countReducer from "./countSlice";
import roomReducer from "./roomSlice";

export const store = configureStore({
    reducer: {
        chat: chatReducer,
        count: countReducer,
        room: roomReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
