import { Fragment, useState } from "react";
import { Avatar } from "../../components/Avatar";
import { Popover, Transition } from "@headlessui/react";
import { AvatarInput } from "../../components/Inputs/AvatarInput";

export const SignIn = () => {
    const [focus, setFocus] = useState(false);
    const [userAvatar, setUserAvatar] = useState("gradient-1");

    return (
        <div className="w-full h-[100vh] flex-center flex-col bg-white gap-4 ">
            <h1 className="special-font text-4xl">Buia Chat</h1>
            <main className="w-full max-w-[500px] bg-white shadow-md min-h-[200px] flex flex-col px-5 py-7 rounded-md border-2 border-solid border-gray-black">
                <label htmlFor="username" className="font-semibold">
                    Username:
                </label>
                <div
                    className={`mb-3 flex h-12 items-center transition-all duration-500
                    ${
                        focus
                            ? "border-violet-500 shadow-md shadow-violet-300"
                            : "border-black"
                    } border-2 px-2 gap-2 rounded-md`}
                >
                    <svg
                        width="36"
                        height="26"
                        viewBox="0 0 18 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M3.7344 5.05863C3.7344 3.26153 5.19123 1.8047 6.98833 1.8047C8.78543 1.8047 10.2423 3.26153 10.2423 5.05863C10.2423 6.85573 8.78543 8.31256 6.98833 8.31256C5.19123 8.31256 3.7344 6.85573 3.7344 5.05863ZM6.98833 0.177734C4.29269 0.177734 2.10743 2.36299 2.10743 5.05863C2.10743 7.75427 4.29269 9.93953 6.98833 9.93953C9.68398 9.93953 11.8692 7.75427 11.8692 5.05863C11.8692 2.36299 9.68398 0.177734 6.98833 0.177734ZM15.1232 7.49908C15.1232 7.0498 14.7589 6.6856 14.3097 6.6856C13.8604 6.6856 13.4962 7.0498 13.4962 7.49908V9.12604H11.8692C11.42 9.12604 11.0557 9.49025 11.0557 9.93953C11.0557 10.3888 11.42 10.753 11.8692 10.753H13.4962V12.38C13.4962 12.8292 13.8604 13.1935 14.3097 13.1935C14.7589 13.1935 15.1232 12.8292 15.1232 12.38V10.753H16.7501C17.1994 10.753 17.5636 10.3888 17.5636 9.93953C17.5636 9.49025 17.1994 9.12604 16.7501 9.12604H15.1232V7.49908ZM2.10743 15.6339C2.10743 15.1533 2.45575 14.5591 3.3654 14.0393C4.25203 13.5327 5.53121 13.1935 6.98833 13.1935C8.44545 13.1935 9.72463 13.5327 10.6113 14.0393C11.5209 14.5591 11.8692 15.1533 11.8692 15.6339C11.8692 16.0832 12.2334 16.4474 12.6827 16.4474C13.132 16.4474 13.4962 16.0832 13.4962 15.6339C13.4962 14.3174 12.5698 13.2846 11.4185 12.6267C10.2441 11.9557 8.67613 11.5665 6.98833 11.5665C5.30053 11.5665 3.73252 11.9557 2.5582 12.6267C1.40689 13.2846 0.480469 14.3174 0.480469 15.6339C0.480469 16.0832 0.844677 16.4474 1.29395 16.4474C1.74323 16.4474 2.10743 16.0832 2.10743 15.6339Z"
                            fill="black"
                        />
                    </svg>
                    <input
                        name="username"
                        type="text"
                        placeholder="Escreva o nome do seu usuários..."
                        className="w-full border-none outline-none text-lg"
                        onFocus={() => setFocus(true)}
                        onBlur={() => setFocus(false)}
                    />
                </div>

                <label htmlFor="avatar" className="font-semibold">
                    Avatar
                </label>
                <AvatarInput />

                <button className="group ml-auto p-2 pl-4 bg-violet-500   text-white font-semibold flex-center justify-between h-12 w-48 text-lg mt-7 rounded-md ">
                    <span />
                    <span className="transition-all duration-200 w-full ">
                        Submit
                    </span>
                    <span className="h-8 w-8 bg-white rounded-md flex-center transition-all duration-200 scale-100 group-hover:w-full">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            width="36"
                            height="26"
                        >
                            <path
                                className="stroke-black"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="48"
                                d="M268 112l144 144-144 144M392 256H100"
                            />
                        </svg>
                    </span>
                </button>
            </main>
        </div>
    );
};
