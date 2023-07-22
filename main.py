from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from pymongo import MongoClient

from decouple import config

from lib.controllers.chat import chat_router
from lib.controllers.websocket import chat_room_router
from lib.deps import conn_manager


from typing import List


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def before_all():
    mongo_uri = config("MONGO_URI")
    mongo_db_name = config("MONGO_DB")
    client = MongoClient(mongo_uri)
    chats: List[str] = [
        str(obj["_id"])
        for obj in client.get_database(name=mongo_db_name)
        .get_collection(name="chats")
        .find()
    ]
    print(chats)
    conn_manager.add_rooms(chats)


app.include_router(router=chat_router, prefix="/chat")
app.include_router(router=chat_room_router, prefix="/room")

if __name__ == "__main__":
    import uvicorn
    from lib.helpers.migration import db_init_check, init_db_with_default

    print("init check: ", db_init_check())
    init_db_with_default()

    uvicorn.run(app, host="0.0.0.0", port=3000)  # noqa: S104
