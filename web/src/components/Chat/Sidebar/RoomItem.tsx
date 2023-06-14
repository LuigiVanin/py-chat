import { useNavigate } from "react-router-dom";
import { InnerRoom } from "../../../types/chat";
import { Avatar } from "../../Avatar";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { setCurrentRoom } from "../../../store/roomSlice";
import { MouseEventHandler } from "react";

export const RoomItem: React.FC<
    InnerRoom & { strategy?: (id: string) => void }
> = ({ name, image, strategy, connected, _id }) => {
    const router = useNavigate();
    const dispatch = useAppDispatch();
    const currentRoom = useAppSelector((state) => state.room.currentRoom);

    const changeCurrentChat = () => {
        if (connected && _id) {
            dispatch(setCurrentRoom(_id));
            router(`/chat/${_id}`);
            return;
        }
    };

    const connectionClick = (event: any) => {
        (event as MouseEvent).stopPropagation();
        strategy && strategy(_id);
        if (connected) {
            if (_id === currentRoom) {
                dispatch(setCurrentRoom(null));
                router("/chat/");
            }
        }
    };

    return (
        <div
            className="group h-14 flex items-center gap-2"
            onClick={changeCurrentChat}
        >
            <Avatar src={image} size="small" rounded={true} />
            <h4 className="line-clamp-1 text-ellipsis">{name}</h4>
            <button
                className={` absolute right-3 group-hover:opacity-100
                           ml-auto px-3 transition-all duration-200 ease-in-out flex items-center justify-center 
                           rounded-md text-md py-1 ${
                               !connected
                                   ? "text-green-500 bg-green-100 hover:bg-green-400"
                                   : "text-red-500 bg-red-100 hover:bg-red-400"
                           } hover:text-white hover:shadow-sm`}
                onClick={connectionClick}
            >
                {connected ? "Leave" : "Join"}
            </button>
        </div>
    );
};
