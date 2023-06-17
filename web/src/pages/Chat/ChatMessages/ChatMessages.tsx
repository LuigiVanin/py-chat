import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentMessages } from "../../../hooks/useCurrentMessages";
import { useAppSelector } from "../../../hooks";
import { Message } from "../../../components/Message/Message";

type Props = {
    roomId: string;
};

export const ChatMessages = () => {
    const navigate = useNavigate();
    const { currentRoom } = useAppSelector((state) => state.room);
    const messages = useCurrentMessages();

    useEffect(() => {
        if (!currentRoom) {
            navigate("/chat/");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ul className="flex w-full flex-col gap-3">
            {messages.map((msg) => {
                return (
                    <li key={msg.messageId} className="flex w-full">
                        <Message {...msg} />
                    </li>
                );
            })}
        </ul>
    );
};
