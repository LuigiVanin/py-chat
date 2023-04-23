import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { Message } from "../types/message";

interface ChatPayload<T> {
    chatName: string;
    data: T;
}

export interface MessageState {
    messages: Record<string, Array<Message>>;
}

const initialState: MessageState = {
    messages: {},
};

export const chatSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        setChatMessages: (
            state,
            action: PayloadAction<ChatPayload<Array<Message>>>
        ) => {
            state.messages[action.payload.chatName] = action.payload.data;
        },
        addChatMessage: (
            state,
            action: PayloadAction<ChatPayload<Message>>
        ) => {
            state.messages[action.payload.chatName].push(action.payload.data);
        },
    },
});

export const { addChatMessage, setChatMessages } = chatSlice.actions;
export default chatSlice.reducer;
