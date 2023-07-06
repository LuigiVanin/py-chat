import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";

interface Props {
    children: React.ReactNode;
    className?: string;
}

export const ThreeDotsMenu: React.FC<Props> = ({ children, className }) => {
    return (
        <Popover className="relative ml-auto z-10">
            <Popover.Button className="ml-auto w-9 h-9 hover:bg-slate-50 flex items-center justify-center rounded-full">
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
                <Popover.Panel
                    className={`${className} absolute left-14 w-auto h-auto shadow-xl rounded-md border-[1px] border-solid border-gray-200 bg-white `}
                >
                    {children}
                </Popover.Panel>
            </Transition>
        </Popover>
    );
};
