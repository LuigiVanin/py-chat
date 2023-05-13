from decouple import config
from pymongo import MongoClient
from pymongo.database import Database

from lib.services.chat import ChatServices
from lib.services.message import MessageService
from fastapi import Depends

from lib.helpers.conn_manager import ConnectionManeger2


def get_db():
    mongo_uri = config("MONGO_URI")
    client = MongoClient(mongo_uri)
    try:
        yield client["py-chat"]
    finally:
        client.close()


def get_service_chat(db: Database = Depends(get_db)):
    try:
        chat_service = ChatServices(db)
        yield chat_service
    except Exception as e:
        print(e)


def get_service_message(db: Database = Depends(get_db)):
    try:
        message_service = MessageService(db)
        yield message_service
    except Exception as e:
        print(e)


conn_manager = ConnectionManeger2()


def get_conn_manager():
    return conn_manager
