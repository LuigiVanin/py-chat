import { useState } from "react";
import { AvatarInput } from "../../components/Inputs/AvatarInput";
import { TextInput } from "../../components/Inputs/TextInput";
import { useUserValidation } from "../../hooks/useValidation";
import toast from "react-hot-toast";
import { useSubmitUser } from "../../hooks/useSubmitUser";
import { useAppSelector } from "../../hooks";

export const SignIn = () => {
    const [username, setUsername] = useState("");
    const [avatar, setUserAvatar] = useState("gradient-1");
    const { validateUserName, error } = useUserValidation();
    const { id } = useAppSelector((state) => state.user);
    const submit = useSubmitUser();

    const userSubmit = () => {
        const isValid = validateUserName(username);
        if (!isValid) {
            toast.error(error || "Usuário incorreto!");
            return;
        }
        toast.success("Usuário salvo com sucesso!");
        submit.action(username, avatar);
    };

    return (
        <div className="w-full h-[100vh] flex-center flex-col bg-white gap-4 ">
            <h1 className="special-font text-4xl">Buia Chat</h1>
            <main className="w-full max-w-[500px] bg-white shadow-md min-h-[200px] flex flex-col px-5 py-7 rounded-md border-2 border-solid border-gray-black">
                <label htmlFor="username" className="font-semibold">
                    Username:
                </label>
                <TextInput
                    setValue={setUsername}
                    value={username}
                    placeholder="Escreva o nome do seu usuários..."
                    error={!!error}
                />
                <label htmlFor="avatar" className="font-semibold">
                    Avatar
                </label>
                <AvatarInput avatar={avatar} setAvatar={setUserAvatar} />

                <button
                    onClick={userSubmit}
                    className="group ml-auto p-2 pl-4 bg-violet-500   text-white font-semibold flex-center justify-between h-12 w-48 text-lg mt-7 rounded-md "
                >
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
