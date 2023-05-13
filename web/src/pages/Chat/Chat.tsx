import { Outlet } from "react-router-dom";

export const Chat = () => {
    return (
        <div>
            <h1>ChatLayout</h1>
            <main>
                <Outlet />
            </main>
        </div>
    );
};
