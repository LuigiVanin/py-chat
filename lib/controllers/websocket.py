from fastapi import (
    APIRouter,
    WebSocket,
    Depends,
    WebSocketDisconnect,
    WebSocketException,
)
from lib.setup import get_conn_manager, get_service_message, get_message_handler
from lib.helpers.conn_manager import ConnectionManeger2 as ConnectionManeger
from lib.helpers.message_handler import MessageHandler
from lib.services.message import MessageService
from lib.schemas.messages import Message, Payload
from pydantic import ValidationError


chat_room_router = APIRouter()


# NOTE: O id da sala será sempre passado pelo payload(income message)
@chat_room_router.websocket("/{user_id}")
async def websocket_endpoint(
    user_id: str,
    websocket: WebSocket,
    conn_manager: ConnectionManeger = Depends(get_conn_manager),
    messsage_service: MessageService = Depends(get_service_message),
    message_handler: MessageHandler = Depends(get_message_handler),
):
    await conn_manager.accept(websocket)

    try:
        while True:
            data = await websocket.receive_json()
            payload = Payload(**data)
            await message_handler.handle(user_id, payload, websocket)
    except (WebSocketDisconnect, WebSocketException):
        await conn_manager.disconnect_all(user_id)
        print(conn_manager.active_connections)
    except ValidationError:
        error_message = Message(text="Mensagem invalida", user_id=user_id, room_id=None)
        websocket.send_json(error_message.dict())
