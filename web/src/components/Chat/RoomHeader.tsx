import React, { useMemo } from "react";
import { useAppSelector } from "../../hooks";
import { Avatar } from "../Avatar";

const useCurrentRoom = () => {
    const { currentRoom: currentRoomId, rooms } = useAppSelector(
        (state) => state.room
    );
    const currentRoom = useMemo(() => {
        if (!currentRoomId) return null;

        return rooms?.find((room) => room._id === currentRoomId) || null;
    }, [currentRoomId, rooms]);

    return currentRoom;
};

export const RoomHeader = () => {
    const room = useCurrentRoom();
    const { connected } = useAppSelector((state) => state.room);
    const amount = useMemo(
        () => (!room ? 0 : connected[room._id]),
        [connected, room]
    );

    return (
        <div className="w-full h-16 bg-white flex flex-row items-center gap-4 px-4 border-b-[1px] border-gray-150">
            {room?._id && (
                <>
                    <div className="flex flex-row items-center gap-3">
                        <Avatar src={room.image} size="medium" rounded />
                        <div className="flex flex-col">
                            <h4 className="line-clamp-1 text-ellipsis text-black font-semibold">
                                {room.name}
                            </h4>
                            <p className="line-clamp-1 text-gray-400 text-sm leading-4">
                                {room.description}
                            </p>
                        </div>
                    </div>
                    <UserCounter quantity={amount} />
                    <button className="ml-auto w-9 h-9 hover:bg-slate-50 flex items-center justify-center rounded-full">
                        <svg
                            width="9"
                            height="30"
                            viewBox="0 0 9 33"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle cx="3.5" cy="4" r="3.5" fill="#e5e7eb" />
                            <circle cx="3.5" cy="16.5" r="3.5" fill="#e5e7eb" />
                            <circle cx="3.5" cy="28.5" r="3.5" fill="#e5e7eb" />
                        </svg>
                    </button>
                </>
            )}
        </div>
    );
};

interface UserCounterProps {
    quantity: number;
}

export const UserCounter: React.FC<UserCounterProps> = ({ quantity }) => {
    return (
        <div className="flex flex-row items-center gap-2 bg-purple-300 px-3 rounded-full py-[2px]">
            <span>
                <svg
                    width="22"
                    height="17"
                    viewBox="0 0 18 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12.5998 1.76471C12.1382 1.76471 11.7191 1.93389 11.4 2.21386C11.0297 2.53884 10.4607 2.50794 10.1293 2.14484C9.79779 1.78172 9.82929 1.2239 10.1996 0.898909C10.8359 0.340559 11.6784 0 12.5998 0C14.5881 0 16.1998 1.58017 16.1998 3.52942C16.1998 4.5748 15.7351 5.51493 15 6.15993C14.6296 6.48493 14.0607 6.45402 13.7292 6.09091C13.3977 5.7278 13.4292 5.16998 13.7996 4.84498C14.1693 4.52059 14.3998 4.05198 14.3998 3.52942C14.3998 2.5548 13.5939 1.76471 12.5998 1.76471ZM7.1999 6.17648C7.1999 5.20186 8.00577 4.41177 8.99986 4.41177C9.99399 4.41177 10.7998 5.20186 10.7998 6.17648C10.7998 7.1511 9.99399 7.94119 8.99986 7.94119C8.00577 7.94119 7.1999 7.1511 7.1999 6.17648ZM8.99986 2.64706C7.01167 2.64706 5.39992 4.22724 5.39992 6.17648C5.39992 8.12573 7.01167 9.70587 8.99986 9.70587C10.988 9.70587 12.5998 8.12573 12.5998 6.17648C12.5998 4.22724 10.988 2.64706 8.99986 2.64706ZM4.47052 8.81999C4.59656 9.29134 4.30897 9.77364 3.82817 9.89726C3.13745 10.0747 2.6015 10.3545 2.25578 10.6593C1.9125 10.962 1.79998 11.2442 1.79998 11.4705C1.79998 11.9578 1.39704 12.3528 0.89999 12.3528C0.402937 12.3528 0 11.9578 0 11.4705C0 10.6113 0.442806 9.88437 1.05219 9.34711C1.65913 8.81205 2.47315 8.42114 3.37172 8.19019C3.85253 8.06662 4.34447 8.34857 4.47052 8.81999ZM14.6282 8.19019C14.1474 8.06662 13.6555 8.34857 13.5294 8.81999C13.4034 9.29134 13.691 9.77364 14.1718 9.89726C14.8625 10.0747 15.3985 10.3545 15.7442 10.6593C16.0874 10.962 16.2 11.2442 16.2 11.4705C16.2 11.9578 16.603 12.3528 17.1 12.3528C17.597 12.3528 18 11.9578 18 11.4705C18 10.6113 17.5571 9.88437 16.9477 9.34711C16.3409 8.81205 15.5268 8.42114 14.6282 8.19019ZM5.39992 14.1176C5.39992 13.8184 5.61085 13.3968 6.28098 13.0025C6.9332 12.6189 7.89232 12.3529 8.99986 12.3529C10.1074 12.3529 11.0665 12.6189 11.7187 13.0025C12.3889 13.3968 12.5998 13.8184 12.5998 14.1176C12.5998 14.605 13.0027 15 13.4998 15C13.9969 15 14.3998 14.605 14.3998 14.1176C14.3998 12.955 13.6034 12.0531 12.6448 11.4893C11.6684 10.9149 10.3776 10.5882 8.99986 10.5882C7.62217 10.5882 6.33133 10.9149 5.3549 11.4893C4.39637 12.0531 3.59995 12.955 3.59995 14.1176C3.59995 14.605 4.00288 15 4.49994 15C4.99698 15 5.39992 14.605 5.39992 14.1176ZM5.39992 0C3.41173 0 1.79998 1.58017 1.79998 3.52942C1.79998 4.5748 2.26469 5.51493 2.99973 6.15993C3.3701 6.48493 3.93907 6.45402 4.27056 6.09091C4.60205 5.7278 4.57053 5.16998 4.20016 4.84498C3.83048 4.52059 3.59995 4.05198 3.59995 3.52942C3.59995 2.5548 4.40583 1.76471 5.39992 1.76471C5.8615 1.76471 6.28063 1.93389 6.59968 2.21386C6.97005 2.53884 7.53901 2.50794 7.8705 2.14484C8.202 1.78172 8.17048 1.2239 7.80011 0.898909C7.16381 0.340559 6.32136 0 5.39992 0Z"
                        fill="black"
                    />
                </svg>
            </span>
            <span className="text-gray-black text-lg font-semibold">
                {quantity}
            </span>
        </div>
    );
};
