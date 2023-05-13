from fastapi import WebSocket


class WebSocketNode:
    id: str
    websocket: WebSocket

    def __init__(self, id: str, websocket: WebSocket):
        self.id = id
        self.websocket = websocket
