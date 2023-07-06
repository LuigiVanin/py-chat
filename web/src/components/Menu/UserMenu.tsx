import { Dialog, Transition } from "@headlessui/react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setUser } from "../../store/userSlice";
import { AvatarInput } from "../Inputs/AvatarInput";
import { TextInput } from "../Inputs/TextInput";
import { Fragment, useState } from "react";

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
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Payment successful
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Your payment has been successfully
                                            submitted. Weve sent you an email
                                            with all of the details of your
                                            order.
                                        </p>
                                    </div>

                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={closeModal}
                                        >
                                            Got it, thanks!
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};
