from fastapi import WebSocket

from lib.helpers.conn_manager import ConnectionManeger
from lib.schemas.messages import Message, Payload
from lib.services.message import MessageService


class MessageHandler:
    conn_manager: ConnectionManeger
    message_service: MessageService

    def __init__(
        self, conn_manager: ConnectionManeger, message_service: MessageService
    ):
        self.conn_manager = conn_manager
        self.message_service = message_service

    async def handle_connect(self, websocket: WebSocket, room_id: str, user_id: str):
        await self.conn_manager.connect(websocket, room_id, user_id)
        await self.conn_manager.broadcast(
            room_id,
            Message(
                text="Conectado",
                username=user_id,
                chat_id=room_id,
                type="status.connect",
            ),
        )

    async def handle_disconnect(self, websocket: WebSocket, room_id: str, user_id: str):
        # TODO: A maneira correta de se fazer essa operaçã seria extraindo o
        #       websocket do conn_manager e de broadcast separadamente.
        await self.conn_manager.broadcast(
            room_id,
            Message(
                text="Conectado",
                username=user_id,
                chat_id=room_id,
                type="status.disconnect",
            ),
        )
        await self.conn_manager.disconnect(room_id, user_id)

    async def handle(self, user_id: str, payload: Payload, websocket: WebSocket):
        if payload.type == "websocket.connect":
            await self.handle_connect(websocket, payload.room_id, user_id)

        elif payload.type == "websocket.disconnect":
            await self.handle_disconnect(websocket, payload.room_id, user_id)

        elif payload.type == "websocket.message":
            message = Message(
                text=payload.content.text,
                username=user_id,
                chat_id=payload.room_id,
                user_avatar=payload.content.user_avatar,
                type="status.message",
            )
            await self.conn_manager.broadcast(payload.room_id, message)
            await self.message_service.create(message)
