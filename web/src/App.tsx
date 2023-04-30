import {
    useAppSelector as useSelector,
    useAppDispatch as useDispatch,
} from "./hooks";
import { decrement, increment, reset } from "./store/countSlice";
import {
    ChatPayload,
    setChatMessages,
    setCurrentChat,
    addMessageToCurrentChat,
} from "./store/chatSlice";
import "./App.css";
import useWebSocket from "react-use-websocket";
import axios from "axios";
import { Message } from "./types/message";
import { useMemo, useState } from "react";

function App() {
    const [inputvalue, setInputValue] = useState("");
    const count = useSelector((state) => state.count.value); //
    const currentChat = useSelector((state) => state.chat.currentChat);
    const messages = useSelector((state) => state.chat.messages);
    const dispatch = useDispatch();
    const currentMessages = useMemo(() => {
        if (currentChat) {
            return messages[currentChat] || [];
        }
        return [];
    }, [currentChat, messages]);
    const { sendMessage } = useWebSocket("ws://localhost:3000/ws", {
        onOpen: async () => {
            console.log("opened");
            const chatName = "mychat";
            let payload: ChatPayload<Array<Message>>;
            try {
                const chats = await axios.get<Array<{ name: string }>>(
                    "http://localhost:3000/chat/"
                );
                console.log(chats);
                dispatch(setCurrentChat(chats.data.at(0)?.name || null));
                const result = await axios.get<Array<Message>>(
                    `http://localhost:3000/chat/${chatName}/messages`
                );
                console.log(result.data);
                payload = {
                    chatName,
                    data: result.data,
                };
                dispatch(setChatMessages(payload));
            } catch (err) {
                console.log(err);
                payload = {
                    chatName,
                    data: [],
                };
                dispatch(setChatMessages(payload));
            }
        },
        onMessage(event) {
            // console.log(event);
            try {
                const data = JSON.parse(event.data) as { text: string };
                console.log(data);
                dispatch(addMessageToCurrentChat(data));
            } catch (err) {
                console.log(err);
            }
        },
        protocols: "echo-protocol",
    });

    return (
        <>
            <p>current chat: {currentChat || "no chat"} </p>
            <p>input: {inputvalue} </p>
            <h1>Websockets</h1>
            <div className="button-group">
                <button onClick={() => dispatch(decrement())}>-</button>
                <button onClick={() => dispatch(reset())}>Reset</button>
                <button onClick={() => dispatch(increment())}>+</button>
            </div>
            <div className="teste">{count}</div>
            <input
                type="text"
                value={inputvalue}
                onChange={(event) => setInputValue(event.target.value)}
            />
            <button onClick={() => sendMessage(inputvalue || "message")}>
                Send
            </button>
            <ul className="messages">
                {currentMessages.map((m) => (
                    <li key={m.text}> {m.text}</li>
                ))}
            </ul>
        </>
    );
}

export default App;
