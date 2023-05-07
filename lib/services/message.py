from pymongo.database import Database
from pymongo.collection import Collection
from lib.services import MongoService
from lib.schemas.messages import Message


class MessageService(MongoService):
    db: Database
    chat_collection: Collection

    def __init__(self, db: Database):
        super().__init__(db)
        self.chat_collection = self.db.get_collection(name="messages")

    async def create(self, message: Message):
        message_dict = message.dict()
        return self.db["messages"].insert_one(message_dict)

    def get_all_by_chat(self, chat_id: str, page: int = 1):
        amount = 20
        messages_list = self.chat_collection.find(
            {"chat_id": chat_id}, limit=amount, skip=(page - 1) * amount
        )
        return [{**msg, "_id": str(msg["_id"])} for msg in messages_list]
