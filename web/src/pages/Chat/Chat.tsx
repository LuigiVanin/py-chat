import { useEffect } from "react";
import { ChatInputBox } from "../../components/Chat/ChatInputBox";
import { RoomHeader } from "../../components/Chat/RoomHeader";
import { Sidebar } from "../../components/Chat/Sidebar";
import { Outlet } from "react-router-dom";
import { useGetRooms } from "../../hooks/useGetRooms";
import { useAppDispatch, useAppSelector } from "../../hooks";
import useWebSocket from "react-use-websocket";
import { IncomingMessage, OutgoingMessage } from "../../types/message";
import { editRoom } from "../../store/roomSlice";

export const Chat = () => {
    const { getRooms, loading } = useGetRooms();
    const dispatch = useAppDispatch();
    const { id, avatar, username } = useAppSelector((state) => state.user);
    const { readyState, sendJsonMessage } = useWebSocket(
        `ws://localhost:3000/room/${id}`,
        {
            protocols: "echo-protocol",
            onMessage: (event) => {
                const payload = JSON.parse(event.data) as IncomingMessage;
            },
        }
    );
    useEffect(() => {
        async function callback() {
            await getRooms();
        }
        callback();
    }, []);

    const connectToRoom = (roomId: string) => {
        const data = {
            type: "websocket.connect",
            content: {
                text: "Hello World",
                user_avatar: avatar,
                username,
            },
            room_id: roomId,
            username,
        };
        dispatch(editRoom({ id: roomId, status: "connect" }));
        sendJsonMessage(data);
    };

    const disconnectToRoom = (roomId: string) => {
        dispatch(editRoom({ id: roomId, status: "disconnect" }));
        const data = {
            type: "websocket.disconnect",
            content: {
                text: "Hello World",
                user_avatar: avatar,
                username,
            },
            room_id: roomId,
            username,
        };
        sendJsonMessage(data);
    };

    return (
        <div className="w-full h-[100vh] bg-slate-100 m-0 flex flex-row">
            <Sidebar
                loading={loading}
                connect={connectToRoom}
                disconnect={disconnectToRoom}
            />
            <main className="w-full flex flex-col">
                <RoomHeader />
                <div className="flex-1 bg-slate-500">
                    <Outlet />
                    {id}
                    ---
                    {readyState}
                </div>

                <footer className="h-24 relative px-5 flex justify-center-center py-4">
                    <ChatInputBox />
                </footer>
            </main>
        </div>
    );
};
