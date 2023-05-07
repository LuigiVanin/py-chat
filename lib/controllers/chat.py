from fastapi import APIRouter, Depends, HTTPException
from bson.objectid import ObjectId
from lib.setup import get_service_chat
from lib.services.chat import ChatServices
from lib.schemas.messages import Message
from lib.services.message import MessageService
from lib.setup import get_service_message

chat_router = APIRouter()


@chat_router.get("/{chat_id}/messages")
def get_messages(
    chat_id: str,
    message_service: MessageService = Depends(get_service_message),
    page: int = 1,
):
    return message_service.get_all_by_chat(chat_id, page=page)


@chat_router.post("/{chat_id}/messages")
async def create_message(
    chat_id: str,
    message: Message,
    chat_service: ChatServices = Depends(get_service_chat),
    message_service: MessageService = Depends(get_service_message),
):
    chat_id_obj: ObjectId
    try:
        chat_id_obj = ObjectId(chat_id)
    except Exception as err:
        raise HTTPException(status_code=422, detail="Chat Id is not valid Id") from err

    chat = chat_service.get_one({"_id": chat_id_obj})
    if chat:
        message.chat_id = chat_id
        await message_service.create(message)
    else:
        raise HTTPException(status_code=404, detail="Chat not found")
    return {"text": "Created Message"}


@chat_router.get("/")
def get_all_chats(chat_service: ChatServices = Depends(get_service_chat)):
    chats = chat_service.get_all()
    return chats
