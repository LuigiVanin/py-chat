import { createBrowserRouter } from "react-router-dom";
import { SignIn } from "../pages/Signin";
import { Chat } from "../pages/Chat";
import { ChatMessages } from "../pages/Chat";

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
                path: ":roomId/",
                element: <ChatMessages />,
            },
        ],
    },
]);
