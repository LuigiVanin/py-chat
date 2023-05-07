from pymongo.database import Database


class MongoService:
    db: Database

    def __init__(self, db: Database):
        self.db = db
