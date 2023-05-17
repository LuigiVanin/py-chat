from fastapi import WebSocket

from lib.helpers.conn_manager import ConnectionManeger2 as ConnectionManeger
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

    def send_disconnect_message(websocket: WebSocket, room_id: str, user_id: str):
        raise NotImplementedError

    def send_connect_message(websocket: WebSocket, room_id: str, user_id: str):
        raise NotImplementedError

    async def handle(self, user_id: str, payload: Payload, websocket: WebSocket):
        if payload.type == "websocket.connect":
            await self.conn_manager.connect(websocket, payload.room_id, user_id)
        elif payload.type == "websocket.disconect":
            await self.conn_manager.disconect(payload.room_id, user_id)
        elif payload.type == "websocket.message":
            message = Message(
                text=payload.content, username=user_id, chat_id=payload.room_id
            )
            await self.conn_manager.broadcast(payload.room_id, message)
            await self.message_service.create(message)
