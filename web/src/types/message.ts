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

type MessageStatus = "message" | "disconnect" | "connect";

type MessageStatusFactory<T extends string> = `${T}.${MessageStatus}`;

export interface BaseMessage {
    text: string;
    username: string;
    user_avatar: string | null;
}

export interface IncomingMessage extends BaseMessage {
    type: MessageStatusFactory<"status">;
    room_id: string;
    user_id: string;
}

export interface OutgoingMessage {
    content: BaseMessage;
    room_id: string;
    username: string;
    type: MessageStatusFactory<"websocket">;
}
