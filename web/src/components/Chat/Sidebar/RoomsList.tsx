import React, { useMemo } from "react";
import { RoomItem } from "./RoomItem";
import { useAppSelector } from "../../../hooks";
import { SidebarProps } from "../../../types/props";

export const RoomsList: React.FC<SidebarProps> = ({
    loading,
    connect,
    disconnect,
}) => {
    const { rooms } = useAppSelector((state) => state.room);

    const disconnectedRooms = useMemo(() => {
        return rooms?.filter((room) => !room.connected);
    }, [rooms]);
    const connectedRooms = useMemo(() => {
        return rooms?.filter((room) => room.connected);
    }, [rooms]);

    // const clickEvent = (id: string) => {
    //     console.log(id);
    // };

    if (loading) {
        return <>Yes, I am fucking loading</>;
    }
    if (!rooms) {
        return <>No chats</>;
    }

    return (
        <>
            <div className="w-full h-14 flex-center bg-violet-600">
                <h3 className="w-full  text-xl font-semibold special-text-gradiente flex px-4 gap-2 text-white">
                    <svg
                        width="26"
                        height="26"
                        viewBox="0 0 39 36"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M13.5077 0.782227C6.06276 0.782227 0.0274121 6.81757 0.0274121 14.2626C0.0274121 16.5761 0.611706 18.7576 1.64127 20.663L0.126236 25.2081C-0.104428 25.9001 0.0756734 26.6631 0.591454 27.1788C1.10724 27.6946 1.87016 27.8747 2.56215 27.6441L7.10727 26.129C8.83752 27.0639 10.7954 27.6317 12.8731 27.7282C15.0327 32.2885 19.6769 35.446 25.0626 35.446C27.376 35.446 29.5577 34.8618 31.4631 33.8321L36.0082 35.3472C36.7002 35.5778 37.4631 35.3977 37.9789 34.882C38.4947 34.3662 38.6748 33.6033 38.4441 32.9113L36.9291 28.3662C37.959 26.4603 38.543 24.2785 38.543 21.9657C38.543 14.7336 32.8479 8.83172 25.6978 8.50005C23.5373 3.93776 18.891 0.782227 13.5077 0.782227ZM26.8748 12.5071C26.9495 13.0817 26.9881 13.6676 26.9881 14.2626C26.9881 20.4889 22.7668 25.7293 17.0301 27.278C18.7549 29.8805 21.7102 31.5945 25.0626 31.5945C26.9604 31.5945 28.7245 31.0475 30.2125 30.1033C30.7014 29.793 31.304 29.7192 31.8533 29.9023L33.5723 30.4753L32.9993 28.7564C32.8211 28.2217 32.886 27.6358 33.177 27.1531L33.4386 26.7192C34.2356 25.3187 34.6914 23.6983 34.6914 21.9657C34.6914 17.2673 31.3263 13.3549 26.8748 12.5071ZM14.1394 23.871C19.1628 23.5457 23.1365 19.3682 23.1365 14.2626C23.1365 8.94471 18.8256 4.63375 13.5077 4.63375C8.1899 4.63375 3.87893 8.94471 3.87893 14.2626C3.87893 16.1603 4.42597 17.9244 5.3702 19.4126C5.68039 19.9015 5.75415 20.504 5.57105 21.0533L4.99807 22.7722L6.71703 22.1992C7.2663 22.0161 7.86881 22.0899 8.3577 22.4001C9.84594 23.3443 11.61 23.8914 13.5077 23.8914C13.6611 23.8914 13.8136 23.8878 13.9651 23.8807C14.0234 23.8748 14.0815 23.8716 14.1394 23.871Z"
                            fill="white"
                        />
                    </svg>
                    Rooms
                    <span>({rooms.length})</span>
                </h3>
            </div>
            {!!connectedRooms && connectedRooms.length ? (
                <>
                    <h4 className="w-full text-lg  flex-center justify-start gap-2 px-3 pl-5 bg-green-100 text-green-500 py-2">
                        <span className="h-[7px] w-[7px] bg-green-500 rounded-full mt-[1px] " />
                        Connected
                    </h4>
                    <ul className="w-full">
                        {connectedRooms.map((room) => (
                            <li
                                key={room._id}
                                className="w-full border-solid border-gray-200 border-b-[1px] first:border-t-[1px] cursor-pointer hover:bg-gray-100 px-3 "
                            >
                                <RoomItem {...room} strategy={disconnect} />
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <React.Fragment />
            )}
            {!!disconnectedRooms && disconnectedRooms.length ? (
                <>
                    <h4 className="w-full text-lg  flex-center justify-start gap-2 px-3 pl-5 text-md text-red-500 bg-red-100 py-2">
                        <span className="h-[7px] w-[7px] bg-red-500 rounded-full mt-[1px] " />
                        Disconnected
                    </h4>
                    <ul className="w-full ">
                        {disconnectedRooms.map((room) => (
                            <li
                                key={room._id}
                                className="w-full border-solid border-gray-200 border-b-[1px] first:border-t-[1px] cursor-pointer hover:bg-gray-100 px-3"
                            >
                                <RoomItem {...room} strategy={connect} />
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <React.Fragment />
            )}
        </>
    );
};
