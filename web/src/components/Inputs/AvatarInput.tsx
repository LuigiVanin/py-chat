import { Popover, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { Avatar } from "../../components/Avatar";
import { AvatarPicker } from "./AvatarPicker";

interface AvatarInputProps {
    avatar: string;
    setAvatar: (avatar: string) => void;
}

export const AvatarInput: React.FC<AvatarInputProps> = ({
    avatar,
    setAvatar,
}) => {
    // const [userAvatar, setUserAvatar] = useState("gradient-1");

    return (
        <Popover className="relative">
            <Popover.Button
                className={`flex py-2 items-center transition-all duration-500 cursor-pointer my-popover-button border-black focus-visible:border-violet-500 shadow-md focus-visible:shadow-violet-300 w-full border-2 px-2 gap-2 rounded-md`}
            >
                <>
                    <div className="outline-2 outline-offset-1 outline-violet-500 outline rounded-sm [aria-expanded=true]:">
                        <Avatar src={avatar} size="small" />
                    </div>
                    <div className=" w-full text-left border-none outline-none text-lg text-ellipsis overflow-hidden line-clamp-1">
                        {avatar}
                    </div>
                    <svg
                        width="20"
                        height="19"
                        viewBox="0 0 7 4"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M1.18718 0.54945C0.943683 0.726894 0.928499 1.02657 1.15326 1.2188L3.55326 3.27143C3.66684 3.36858 3.82668 3.42383 3.99414 3.42383C4.1616 3.42383 4.32144 3.36858 4.43502 3.27143L6.83502 1.2188C7.05978 1.02657 7.0446 0.726893 6.80111 0.549449C6.55761 0.372005 6.17802 0.383993 5.95326 0.576223L3.99414 2.25178L2.03502 0.576224C1.81026 0.383993 1.43067 0.372006 1.18718 0.54945Z"
                            fill="#41167f"
                        />
                    </svg>
                </>
            </Popover.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
            >
                <Popover.Panel className="absolute left-0 z-10 mt-3 w-full h-auto shadow-xl rounded-md border-[1px] border-solid border-gray-200 bg-white">
                    <AvatarPicker avatar={avatar} setAvatar={setAvatar} />
                </Popover.Panel>
            </Transition>
        </Popover>
    );
};
