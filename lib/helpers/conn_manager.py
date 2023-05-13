from fastapi import WebSocket
from typing import List, Dict

from lib.helpers.ws_node import WebSocketNode
from lib.schemas.messages import Message

import asyncio as future


class ConnectionManeger2:
    def __init__(self):
        self.active_connections: Dict[str, List[WebSocketNode]] = {}

    def add_room(self, room: str):
        self.active_connections[room] = []

    def add_rooms(self, rooms: List[str]):
        for room in rooms:
            self.add_room(room)

    async def connect(self, websocket: WebSocket, room_id: str, user_id: str):
        await websocket.accept()
        if room_id in self.active_connections:
            print("alow")
            node = WebSocketNode(user_id, websocket)
            self.active_connections[room_id].append(node)

    async def disconect(self, room_id: str, user_id: str):
        if room_id in self.active_connections:
            # Close connection
            # for connection in self.active_connections[room_id]:
            #     if user_id == connection.id:
            #         await connection.websocket.close()
            #         break
            # Filter operation on top active_connection room array
            self.active_connections[room_id] = [
                conn for conn in self.active_connections[room_id] if conn.id != user_id
            ]

    async def broadcast(self, room_id: str, message: Message):
        if room_id in self.active_connections:
            # for connection in self.active_connections[room_id]:
            #     await connection.websocket.send_json(message.dict())
            tasks = [
                conn.websocket.send_json(message.dict())
                for conn in self.active_connections[room_id]
            ]
            await future.gather(*tasks)
