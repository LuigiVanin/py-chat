from pymongo import MongoClient

from decouple import config


print("Hello")
mongo_uri = config("MONGO_URI")
mongo_db_name = config("MONGO_DB")

client = MongoClient(mongo_uri)

should_contain = ["chats", "messages"]


def db_init_check() -> bool:
    db = client.get_database(name=mongo_db_name)
    collections = db.list_collection_names()
    return all(name in collections for name in should_contain)


def init_db_with_default() -> None:
    if db_init_check():
        return
    db = client.get_database(name=mongo_db_name)
    collections = db.list_collection_names()
    for name in should_contain:
        if name not in collections:
            db.create_collection(name=name)
    print(
        "DB initialized",
        client.get_database(name=mongo_db_name).list_collection_names(),
    )
