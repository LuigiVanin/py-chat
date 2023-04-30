import { PayloadAction, createSlice, current } from "@reduxjs/toolkit";
import type { Message } from "../types/message";

export interface ChatPayload<T> {
    chatName: string;
    data: T;
}

export interface MessageState {
    messages: Record<string, Array<Message>>;
    currentChat: string | null;
}

const initialState: MessageState = {
    messages: {},
    currentChat: null,
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
        setCurrentChat: (state, action: PayloadAction<string | null>) => {
            state.currentChat = action.payload || null;
            if (state.currentChat) {
                state.messages[state.currentChat] = [];
            }
        },
        addMessageToCurrentChat: (state, action: PayloadAction<Message>) => {
            if (state.currentChat) {
                state.messages[state.currentChat].push(action.payload);
            }
        },
    },
});

export const {
    addChatMessage,
    setChatMessages,
    setCurrentChat,
    addMessageToCurrentChat,
} = chatSlice.actions;
export default chatSlice.reducer;
