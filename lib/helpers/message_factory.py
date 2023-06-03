from lib.schemas.messages import Message, Payload


class MessageFactory:
    def create_connect_message(
        self, payload: Payload, users_connected: int, user_id: str
    ) -> Message:
        return Message(
            username=payload.username,
            user_id=user_id,
            text=str(users_connected),
            type="status.connect",
            room_id=payload.room_id,
        )

    def create_disconnect_message(self, payload: Payload, user_id: str) -> Message:
        return Message(
            text="DISCONNECT",
            username=payload.username,
            user_id=user_id,
            room_id=payload.room_id,
            type="status.disconnect",
        )

    def create_text_message(self, payload: Payload, user_id: str) -> Message:
        return Message(
            username=payload.content.username,
            user_id=user_id,
            user_avatar=payload.content.user_avatar,
            text=payload.content.text,
            type="status.message",
            room_id=payload.room_id,
        )
