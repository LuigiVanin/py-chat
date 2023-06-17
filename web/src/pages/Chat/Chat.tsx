import { useEffect } from "react";
import { ChatInputBox } from "../../components/Chat/ChatInputBox";
import { RoomHeader } from "../../components/Chat/RoomHeader";
import { Sidebar } from "../../components/Chat/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useGetRooms } from "../../hooks/useGetRooms";
import { useAppDispatch, useAppSelector } from "../../hooks";
import useWebSocket from "react-use-websocket";
import { IncomingMessage, OutgoingMessage } from "../../types/message";
import { editRoom, editRoomMembersCount } from "../../store/roomSlice";
import { addChatMessage } from "../../store/chatSlice";
import { JsonPrimitive, JsonValue } from "react-use-websocket/dist/lib/types";
import { toast } from "react-hot-toast";

export const Chat = () => {
    const { getRooms, loading } = useGetRooms();
    const navigator = useNavigate();
    const dispatch = useAppDispatch();
    const { id, avatar, username } = useAppSelector((state) => state.user);
    const { currentRoom } = useAppSelector((state) => state.room);

    useEffect(() => {
        async function callback() {
            await getRooms();
        }
        callback();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { readyState, sendJsonMessage } = useWebSocket(
        `ws://localhost:3000/room/${id}`,
        {
            protocols: "echo-protocol",
            onMessage: (event) => {
                const payload = JSON.parse(event.data) as IncomingMessage;

                if (payload.type === "status.connect") {
                    const membersCount = Number(payload.text);
                    console.log("Contando users: ", membersCount, payload.text);
                    dispatch(
                        editRoomMembersCount({
                            id: payload.room_id,
                            amount: !isNaN(membersCount) ? membersCount + 1 : 0,
                        })
                    );
                }
                // TODO: improve this logic
                dispatch(
                    addChatMessage({
                        chatId: payload.room_id,
                        data: {
                            text: payload.text,
                            type: payload.type,
                            user_avatar: payload.user_avatar,
                            username: payload.username,
                            user_id: payload.user_id,
                            room_id: payload.room_id,
                        },
                    })
                );
            },
        }
    );

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

    const sendMessageToRoom = async (text: string) => {
        if (!username || !currentRoom) {
            toast.error("You need to login first");
            navigator("/");
            return;
        }
        const data: OutgoingMessage = {
            type: "websocket.message",
            content: {
                text: text,
                user_avatar: avatar,
                username,
            },
            room_id: currentRoom,
            username,
        };
        sendJsonMessage(data as unknown as JsonValue);
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
                <div className="flex-1 p-5 overflow-y-scroll h-full w-full">
                    <Outlet />
                </div>
                <footer className="h-24 relative px-5 flex justify-center-center py-4">
                    <ChatInputBox onSubmitMessage={sendMessageToRoom} />
                </footer>
            </main>
        </div>
    );
};
