import React, { useMemo } from "react";
import { Avatar } from "../Avatar";
import { useAppSelector } from "../../hooks";
import { RoomsList } from "./Sidebar/RoomsList";
import { SidebarProps } from "../../types/props";

export const Sidebar: React.FC<SidebarProps> = ({
    loading,
    connect,
    disconnect,
}) => {
    const { avatar, username, id } = useAppSelector((state) => state.user);

    const tagId = useMemo(() => (id ? id.split("-")[0] : ""), [id]);

    return (
        <aside className="min-w-[250px] max-w-[400px] w-[35%] bg-white drop-shadow-md flex flex-col">
            <header
                className="w-full h-16 flex flex-row px-3 items-center gap-3 border-b-[1px] border-gray-150  z-10"
                style={{ boxShadow: "-10px 0px 15px #20202082 " }}
            >
                <Avatar src={avatar || "gradient-1"} size="medium" />
                <div className="">
                    <h4 className="font-semibold line-clamp-1 text-ellipsis">
                        {username}
                    </h4>
                    <p className="leading-4 text-sm text-gray-400 line-clamp-1 text-ellipsis">
                        #{tagId}
                    </p>
                </div>

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
            </header>
            <div className="main-content w-full flex-1 flex flex-col items-center">
                <RoomsList
                    loading={loading}
                    connect={connect}
                    disconnect={disconnect}
                />
            </div>
        </aside>
    );
};
