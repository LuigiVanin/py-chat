import { PayloadAction as Act, createSlice } from "@reduxjs/toolkit";
import type {
    IncomingMessage,
    Message,
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
        setChatMessages: (state, action: Act<Payload<IncomingMessage[]>>) => {
            state.messages[action.payload.chatId] = action.payload.data;
        },
        addChatMessage: (state, action: Act<Payload<IncomingMessage>>) => {
            if (!state.messages[action.payload.chatId]) {
                state.messages[action.payload.chatId] = [];
            }
            state.messages[action.payload.chatId].push(action.payload.data);
        },
    },
});

export const { addChatMessage, setChatMessages } = chatSlice.actions;
export default chatSlice.reducer;
