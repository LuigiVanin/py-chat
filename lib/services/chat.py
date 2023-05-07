from pymongo.database import Database
from pymongo.collection import Collection
from lib.services import MongoService


class ChatServices(MongoService):
    db: Database
    chat_collection: Collection

    def __init__(self, db: Database):
        super().__init__(db)
        self.chat_collection = self.db.get_collection(name="chats")

    def create(self, chat):
        return self.db["chats"].insert_one(chat)

    def get_all(self):
        chat_list = [
            {**obj, "_id": str(obj["_id"])} for obj in self.chat_collection.find()
        ]
        return chat_list

    def get_one(self, query):
        return self.chat_collection.find_one(query)
