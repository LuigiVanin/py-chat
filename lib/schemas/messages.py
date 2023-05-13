from pydantic import BaseModel, Field
from typing import Optional


class Message(BaseModel):
    text: str = Field(..., min_length=1, max_length=500)
    username: str = Field(..., min_length=1, max_length=500)
    user_avatar: Optional[str] = None
    chat_id: Optional[str] = None
