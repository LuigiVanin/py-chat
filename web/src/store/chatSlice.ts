import { generateUuid } from "./../helpers/uuid";
import { PayloadAction as Act, createSlice } from "@reduxjs/toolkit";
import type {
    IncomingMessage,
    MessageState,
    ChatPayload as Payload,
} from "../types/message";

const initialState: MessageState = {
    messages: {},
};

export const chatSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        clearChatMessages: (state) => {
            state.messages = initialState.messages;
        },
        setChatMessages: (state, action: Act<Payload<IncomingMessage[]>>) => {
            state.messages[action.payload.chatId] = action.payload.data;
        },
        addChatMessage: (state, action: Act<Payload<IncomingMessage>>) => {
            if (!state.messages[action.payload.chatId]) {
                state.messages[action.payload.chatId] = [];
            }
            state.messages[action.payload.chatId].push({
                ...action.payload.data,
                messageId: generateUuid(),
            });
        },
    },
});

export const { addChatMessage, setChatMessages, clearChatMessages } =
    chatSlice.actions;
export default chatSlice.reducer;
