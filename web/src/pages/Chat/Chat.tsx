import { useEffect } from "react";
import { ChatInputBox } from "../../components/Chat/ChatInputBox";
import { RoomHeader } from "../../components/Chat/RoomHeader";
import { Sidebar } from "../../components/Chat/Sidebar";
import { Outlet } from "react-router-dom";
import { useGetRooms } from "../../hooks/useGetRooms";

export const Chat = () => {
    const { getRooms, loading } = useGetRooms();

    useEffect(() => {
        async function callback() {
            const res = await getRooms();
            console.log(res);
        }
        callback();
    }, []);

    return (
        <div className="w-full h-[100vh] bg-slate-100 m-0 flex flex-row">
            <Sidebar loading={loading} />
            <main className="w-full flex flex-col">
                <RoomHeader />
                <div className="flex-1 bg-slate-500">
                    <Outlet />
                </div>

                <footer className="h-24 relative px-5 flex justify-center-center py-4">
                    <ChatInputBox />
                </footer>
            </main>
        </div>
    );
};
