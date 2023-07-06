import { Dialog, Transition } from "@headlessui/react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setUser } from "../../store/userSlice";
import { AvatarInput } from "../Inputs/AvatarInput";
import { TextInput } from "../Inputs/TextInput";
import { Fragment, useState } from "react";
import { LogoutModal } from "../Modal/LogouModal";

export const UserMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const dispatch = useAppDispatch();
    const { avatar, username, id } = useAppSelector((state) => state.user);

    const setAvatar = (newAvatar: string) => {
        dispatch(setUser({ avatar: newAvatar, username, id }));
    };
    const setUsername = (newUsername: string) => {
        dispatch(setUser({ avatar, username: newUsername, id }));
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <>
            <div className="w-[400px] p-4  flex flex-col ">
                <h2 className="text-lg mb-0 font-semibold">User Options:</h2>
                <hr className="my-4" />
                <p className="text-sm text-gray-500 pb-4">
                    Change your user infor using the following fields(this will
                    not change the data on the messages). The changes are
                    automatically saved.
                </p>
                <div className="">
                    <TextInput
                        value={username || "Sem nome"}
                        setValue={setUsername}
                    />
                    <AvatarInput
                        avatar={avatar || "gradient-1"}
                        setAvatar={setAvatar}
                    />
                </div>
                <hr className="my-4" />
                <button
                    className="bg-red-200 ml-auto text-red-500  w-44 py-2 rounded-md hover:bg-red-500 
                                   hover:text-white hover:font-semibold transition-all duration-200 ease-in-out"
                    onClick={() => {
                        setIsOpen(true);
                    }}
                >
                    Logout
                </button>
            </div>
            <LogoutModal isOpen={isOpen} closeModal={closeModal} />
        </>
    );
};
