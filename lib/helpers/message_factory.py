from lib.helpers.message import Message, Payload


class MessageFactory:
    def create_connect_message(payload: Payload, users_connected: int) -> Message:
        return Message(
            username=Payload.username,
            user_avatar=Payload.user_avatar,
            text=str(users_connected),
            type="websocket.connect",
            chat_id=Payload.room_id,
        )

    def create_disconnect_message(Payload) -> Message:
        return Message(
            username=Payload.username,
            user_avatar=Payload.user_avatar,
            text="disconnect",
            type="websocket.disconnect",
            chat_id=Payload.room_id,
        )

    def create_text_message(payload: Payload) -> Message:
        return Message(
            username=Payload.username,
            user_avatar=Payload.user_avatar,
            text=payload.content.text,
            type="websocket.message",
            chat_id=Payload.room_id,
        )
