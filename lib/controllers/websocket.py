from fastapi import (
    APIRouter,
    WebSocket,
    Depends,
    WebSocketDisconnect,
    WebSocketException,
    Header,
)
from lib.setup import get_conn_manager, get_service_message, get_message_handler
from lib.helpers.conn_manager import ConnectionManager
from lib.helpers.message_handler import MessageHandler
from lib.services.message import MessageService
from lib.schemas.messages import Message, Payload
from pydantic import ValidationError
from typing import Union


chat_room_router = APIRouter()


@chat_room_router.websocket("/")
async def websocket_endpoint(
    websocket: WebSocket,
    conn_manager: ConnectionManager = Depends(get_conn_manager),
    messsage_service: MessageService = Depends(get_service_message),
    message_handler: MessageHandler = Depends(get_message_handler),
    user_id: Union[str, None] = Header(default=None),
):
    if not user_id:
        raise WebSocketException("Missing user_id")

    await conn_manager.accept(websocket)

    try:
        while True:
            data = await websocket.receive_json()

            payload = Payload(**data)
            await message_handler.handle(user_id, payload, websocket)
    except (WebSocketDisconnect, WebSocketException):
        await conn_manager.disconnect_all(user_id)
    except ValidationError:
        error_message = Message(text="Mensagem invalida", user_id=user_id, room_id=None)
        websocket.send_json(error_message.dict())
