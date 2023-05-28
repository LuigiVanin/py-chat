import { createBrowserRouter } from "react-router-dom";
import { SignIn } from "../pages/Signin";
import { Chat } from "../pages/Chat";
import { ChatMessages, NoChatMessages } from "../pages/Chat";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <SignIn />,
    },
    {
        path: "/chat",
        element: <Chat />,
        children: [
            {
                path: "",
                element: <NoChatMessages />,
            },
            {
                path: ":roomId/",
                element: <ChatMessages />,
            },
        ],
    },
]);
