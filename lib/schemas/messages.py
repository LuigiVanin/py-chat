from pydantic import BaseModel, Field
from typing import Optional, Union, Literal


class Message(BaseModel):
    text: str = Field(..., min_length=1, max_length=500)
    username: str = Field(..., min_length=1, max_length=500)
    user_avatar: Optional[str] = None
    chat_id: Optional[str] = None


# TODO: adicionar Validacao adequeado de acordo com pydantic
class Payload(BaseModel):
    content: str
    room_id: str
    type: Union[
        Literal["websocket.connect"],
        Literal["websocket.disconnect"],
        Literal["websocket.message"],
    ]
