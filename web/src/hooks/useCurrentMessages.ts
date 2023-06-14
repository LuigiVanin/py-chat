import { useMemo } from "react";
import { useAppSelector } from "../hooks";

export const useCurrentMessages = () => {
    const currentRoom = useAppSelector((state) => state.room.currentRoom);
    const chat = useAppSelector((state) => state.chat.messages);

    const currentMessages = useMemo(() => {
        if (!currentRoom) return [];
        return chat[currentRoom] || [];
    }, [currentRoom, chat]);

    return currentMessages;
};
