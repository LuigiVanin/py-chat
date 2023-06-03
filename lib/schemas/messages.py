from pydantic import BaseModel, Field
from typing import Optional, Union, Literal


class MessageBase(BaseModel):
    text: str = Field(..., min_length=1, max_length=500)
    username: str = Field(..., min_length=1, max_length=500)
    user_avatar: Optional[str] = None


class Message(MessageBase):
    type: Union[
        Literal["status.message"],
        Literal["status.disconnect"],
        Literal["status.connect"],
    ] = Field(default="status.message")
    room_id: Optional[str] = None
    user_id: str


# TODO: adicionar Validacao adequeado de acordo com pydantic
class Payload(BaseModel):
    content: Union[str, MessageBase]
    room_id: str
    username: str
    type: Union[
        Literal["websocket.connect"],
        Literal["websocket.disconnect"],
        Literal["websocket.message"],
    ]
