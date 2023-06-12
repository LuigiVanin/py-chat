import { createBrowserRouter, redirect } from "react-router-dom";
import { SignIn } from "../pages/Signin";
import { Chat } from "../pages/Chat";
import { ChatMessages, NoChatMessages } from "../pages/Chat";
import { UserLocalStorage } from "../helpers/localStorageProxy";
import { userGuard } from "./guards/userGuard";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <SignIn />,
        loader: userGuard,
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
