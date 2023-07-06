import React, { useMemo } from "react";
import { Avatar } from "../Avatar";
import { useAppSelector } from "../../hooks";
import { RoomsList } from "./Sidebar/RoomsList";
import { SidebarProps } from "../../types/props";
import { ThreeDotsMenu } from "../Menu/ThreeDotsMenu";
import { UserMenu } from "../Menu/UserMenu";

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

                <ThreeDotsMenu className="mt-[15px] left-[5px] w-48">
                    <UserMenu />
                </ThreeDotsMenu>
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
