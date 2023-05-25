from fastapi import WebSocket
from typing import List, Dict

from lib.helpers.ws_node import WebSocketNode
from lib.schemas.messages import Message

import asyncio as future


class ConnectionManeger:
    def __init__(self):
        self.active_connections: Dict[str, List[WebSocketNode]] = {}

    def add_room(self, room: str):
        self.active_connections[room] = []

    def add_rooms(self, rooms: List[str]):
        for room in rooms:
            self.add_room(room)

    async def accept(self, websocket: WebSocket):
        await websocket.accept()

    async def connect(self, websocket: WebSocket, room_id: str, user_id: str):
        if room_id in self.active_connections:
            node = WebSocketNode(user_id, websocket)
            self.active_connections[room_id].append(node)

    async def disconnect(self, room_id: str, user_id: str):
        if room_id in self.active_connections:
            self.active_connections[room_id] = [
                conn for conn in self.active_connections[room_id] if conn.id != user_id
            ]

    async def disconnect_all(self, user_id: str):
        for room_id in self.active_connections:
            await self.disconnect(room_id, user_id)

    async def broadcast(self, room_id: str, message: Message):
        if room_id in self.active_connections:
            tasks = [
                conn.websocket.send_json(message.dict())
                for conn in self.active_connections[room_id]
            ]
            await future.gather(*tasks)
