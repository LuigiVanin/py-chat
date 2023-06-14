import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useCurrentMessages } from "../../../hooks/useCurrentMessages";

type Props = {
    roomId: string;
};

export const ChatMessages = () => {
    const params = useParams<Props>();
    useEffect(() => {
        console.log(params.roomId);
    }, [params.roomId]);

    const messages = useCurrentMessages();

    return (
        <div>
            {messages.map((msg) => {
                return (
                    <div>
                        {msg.text} {msg.type} {msg.user_avatar} {msg.username}
                    </div>
                );
            })}
        </div>
    );
};
