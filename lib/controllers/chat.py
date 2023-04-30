from fastapi import APIRouter

chatRouter = APIRouter()


@chatRouter.get("/{chat_id}/messages")
def get_messages(chat_id: str):
    print(chat_id)
    return [{"text": "Hello World"}]


@chatRouter.get("/")
def get_all_chats():
    print("chat")
    return [{"name": "My chat"}]
