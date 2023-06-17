import React, { useMemo } from "react";
import { IncomingMessage } from "../../types/message";
import { Avatar } from "../Avatar";
import { useAppSelector } from "../../hooks";

export const Message: React.FC<IncomingMessage> = ({
    text,
    user_avatar,
    type,
    username,
    user_id,
}) => {
    const { id } = useAppSelector((state) => state.user);
    const newText = useMemo(() => {
        if (type === "status.connect") {
            return (
                <>
                    Usuário <strong>{username}</strong> entrou na sala!
                </>
            );
        } else if (type === "status.disconnect") {
            return (
                <>
                    Usuário <strong>{username}</strong> saiu na sala!
                </>
            );
        } else {
            return text;
        }
    }, [text, type, username]);

    return (
        <div
            className={`min-w-[250px] max-w-[80%] px-5 py-3  rounded-xl shadow-md w-auto
                        overflow-x-hidden 
                        flex gap-3 items-start
            ${
                type !== "status.message"
                    ? "bg-yellow-100 border-[1px] border-solid text-yellow-500 text-yellow-500 mx-auto"
                    : user_id === id
                    ? "bg-green-100 ml-auto border-[1px] border-solid "
                    : "bg-white"
            } `}
        >
            {user_avatar && <Avatar src={user_avatar} size="small" />}
            <div className="flex flex-col ">
                {type === "status.message" && (
                    <h3 className="mb-0 font-semibold text-gray-500">
                        ~{username}
                    </h3>
                )}
                <p className="inline-block" style={{ wordBreak: "break-word" }}>
                    {newText}
                </p>
            </div>
        </div>
    );
};
