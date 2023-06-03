from fastapi import WebSocket

from lib.helpers.conn_manager import ConnectionManager
from lib.schemas.messages import Message, Payload
from lib.services.message import MessageService
from lib.helpers.message_factory import MessageFactory


class MessageHandler:
    conn_manager: ConnectionManager
    message_service: MessageService
    message_factory: MessageFactory

    def __init__(
        self, conn_manager: ConnectionManager, message_service: MessageService
    ):
        self.conn_manager = conn_manager
        self.message_service = message_service
        self.message_factory = MessageFactory()

    async def handle_connect(
        self, websocket: WebSocket, payload: Payload, user_id: str
    ):
        msg: Message = self.message_factory.create_connect_message(
            payload,
            str(self.conn_manager.connected_users_len(payload.room_id)),
            user_id,
        )
        await self.conn_manager.connect(
            websocket, room_id=payload.room_id, user_id=user_id
        )
        await self.conn_manager.broadcast(payload.room_id, msg)

    async def handle_disconnect(
        self, websocket: WebSocket, payload: Payload, user_id: str
    ):
        # TODO: A maneira correta de se fazer essa operaçã seria extraindo o
        #       websocket do conn_manager e de broadcast separadamente.

        msg = self.message_factory.create_disconnect_message(payload, user_id)
        await self.conn_manager.broadcast(
            payload.room_id,
            msg,
        )
        await self.conn_manager.disconnect(payload.room_id, user_id)

    async def handle_message(self, websocket: WebSocket, room_id: str, user_id: str):
        pass

    async def handle(self, user_id: str, payload: Payload, websocket: WebSocket):
        if payload.type == "websocket.connect":
            await self.handle_connect(websocket, payload, user_id)

        elif payload.type == "websocket.disconnect":
            await self.handle_disconnect(websocket, payload, user_id)

        elif payload.type == "websocket.message":
            message = Message(
                text=payload.content.text,
                username=payload.content.username,
                room_id=payload.room_id,
                user_avatar=payload.content.user_avatar,
                user_id=user_id,
                type="status.message",
            )
            await self.conn_manager.broadcast(payload.room_id, message)
            await self.message_service.create(message)
