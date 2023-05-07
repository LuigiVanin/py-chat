from fastapi import FastAPI, WebSocket

from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware

from pymongo import MongoClient

from lib.helpers.conn_manager import ConnectionManager
from lib.controllers.chat import chat_router

from decouple import config


connection_manager = ConnectionManager()
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

    client = MongoClient(mongo_uri)
    print(client.list_database_names())


app.include_router(router=chat_router, prefix="/chat")

html = """
<!DOCTYPE html>
<html>
    <head>
        <title>Chat</title>
    </head>
    <body>
        <h1>WebSocket Chat</h1>
        <form action="" onsubmit="sendMessage(event)">
            <input type="text" id="messageText" autocomplete="off"/>
            <button>Send</button>
        </form>
        <ul id='messages'>
        </ul>
        <script>
            var ws = new WebSocket("ws://localhost:3000/ws", 'echo-protocol');
            ws.onmessage = function(event) {
                var messages = document.getElementById('messages')
                var message = document.createElement('li')
                var content = document.createTextNode(event.data)
                message.appendChild(content)
                messages.appendChild(message)
            };
            function sendMessage(event) {
                var input = document.getElementById("messageText")
                ws.send(input.value)
                input.value = ''
                event.preventDefault()
            }
        </script>
    </body>
</html>
"""


@app.get("/")
def chat_html():
    return HTMLResponse(html)


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await connection_manager.connect(websocket)

    while True:
        data = await websocket.receive_text()
        print(data)
        await connection_manager.broadcast(data)
