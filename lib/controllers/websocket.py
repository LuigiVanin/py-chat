from fastapi import (
    APIRouter,
    WebSocket,
    Depends,
    WebSocketDisconnect,
    WebSocketException,
)
from lib.setup import get_conn_manager, get_service_message
from lib.helpers.conn_manager import ConnectionManeger2 as ConnectionManeger
from lib.services.message import MessageService
from lib.schemas.messages import Message

chat_room_router = APIRouter()


@chat_room_router.websocket("/{room_id}/{user_id}")
async def websocket_endpoint(
    room_id: str,
    user_id: str,
    websocket: WebSocket,
    conn_manager: ConnectionManeger = Depends(get_conn_manager),
    messsage_service: MessageService = Depends(get_service_message),
):
    await conn_manager.connect(websocket, room_id, user_id)
    print(conn_manager.active_connections)

    try:
        while True:
            data = await websocket.receive_text()
            message = Message(text=data, username=user_id, chat_id=room_id)
            print(message)
            await conn_manager.broadcast(room_id, message)
            await messsage_service.create(message)
    except (WebSocketDisconnect, WebSocketException):
        await conn_manager.disconect(room_id, user_id)
        print(conn_manager.active_connections)
