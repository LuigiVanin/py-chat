import { configureStore } from "@reduxjs/toolkit";

import chatReducer from "./chatSlice";
import countReducer from "./countSlice";

export const store = configureStore({
    reducer: {
        chat: chatReducer,
        // TODO: this slice is only for testing purposes and should be removed afterwards
        count: countReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
