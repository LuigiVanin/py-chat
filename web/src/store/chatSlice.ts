import { PayloadAction as Act, createSlice } from "@reduxjs/toolkit";
import type {
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
        setChatMessages: (state, action: Act<Payload<Message[]>>) => {
            state.messages[action.payload.chatName] = action.payload.data;
        },
        addChatMessage: (state, action: Act<Payload<Message>>) => {
            state.messages[action.payload.chatName].push(action.payload.data);
        },
    },
});

export const { addChatMessage, setChatMessages } = chatSlice.actions;
export default chatSlice.reducer;
