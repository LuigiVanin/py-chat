from fastapi import APIRouter, WebSocket, Depends
from lib.setup import get_connection_manager

chat_room_router = APIRouter()


@chat_room_router.websocket("/{chat_id}/{user_name}")
async def websocket_endpoint(
    chat_id: str,
    user_name: str,
    websocket: WebSocket,
    connection_manager=Depends(get_connection_manager),
):
    await connection_manager.connect(websocket)

    while True:
        data = await websocket.receive_text()
        print(data)
        await connection_manager.broadcast(data)
