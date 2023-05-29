export interface Message {
    text: string;
}

export interface MessageState {
    messages: Record<string, Message[]>;
}

export interface ChatPayload<T> {
    chatName: string;
    data: T;
}
