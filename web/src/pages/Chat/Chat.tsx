import { ChatInputBox } from "../../components/Chat/ChatInputBox";
import { RoomHeader } from "../../components/Chat/RoomHeader";
import { Sidebar } from "../../components/Chat/Sidebar";
import { Outlet } from "react-router-dom";

export const Chat = () => {
    console.log("Chat");

    return (
        <div className="w-full h-[100vh] bg-slate-100 m-0 flex flex-row">
            <Sidebar />
            <main className="w-full flex flex-col">
                <RoomHeader />
                {/* <ChatHeader /> */}
                <Outlet />

                <footer>
                    <ChatInputBox />
                </footer>
            </main>
        </div>
    );
};
