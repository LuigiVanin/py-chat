import React, { useState } from "react";
import { Avatar } from "../Avatar";
import { TextInput } from "./TextInput";
import axios from "axios";

type GradientEnum = `gradient-${number}`;

interface AvatarPickerProps {
    avatar?: string;
    setAvatar?: (avatar: string) => void;
}

const UrlIcon: React.FC = () => (
    <svg
        width="28"
        height="28"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M18.6484 9.49694L10.6112 17.077C9.62661 18.0057 8.29118 18.5273 6.89872 18.5273C5.50626 18.5273 4.17083 18.0057 3.18621 17.077C2.20159 16.1484 1.64844 14.8889 1.64844 13.5757C1.64844 12.2624 2.20159 11.0029 3.18621 10.0743L11.2234 2.49422C11.8798 1.87514 12.7701 1.52734 13.6984 1.52734C14.6267 1.52734 15.517 1.87514 16.1734 2.49422C16.8298 3.1133 17.1986 3.95295 17.1986 4.82846C17.1986 5.70397 16.8298 6.54362 16.1734 7.1627L8.12748 14.7428C7.79927 15.0523 7.35413 15.2262 6.88997 15.2262C6.42582 15.2262 5.98068 15.0523 5.65247 14.7428C5.32426 14.4333 5.13988 14.0134 5.13988 13.5757C5.13988 13.1379 5.32426 12.7181 5.65247 12.4086L13.0775 5.41408"
            stroke="rgb(0, 0, 0)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export const AvatarPicker: React.FC<AvatarPickerProps> = ({
    avatar,
    setAvatar,
}) => {
    const avatarsGradients: GradientEnum[] = Array(6)
        .fill(0)
        .map((_, index: number) => ("gradient-" + (index + 1)) as GradientEnum);

    const [urlInput, setUrlInput] = useState("");
    const [loading, setLoading] = useState(false);

    const validateImageUrl = async (url: string): Promise<boolean> => {
        try {
            const response = await axios.head(url);

            console.log(url);
            console.log(response.headers);
            const contentType = response.headers["content-type"];
            return contentType.startsWith("image/");
        } catch (err) {
            console.log(err);
            console.log("Some nasty error happened");
            return false;
        }
    };

    const uploadUserAvatar = async (url: string) => {
        setLoading(true);
        const isValid = await validateImageUrl(url);
        console.log(isValid);
        if (isValid) {
            setAvatar && setAvatar(url);
        }
        setLoading(false);
    };

    return (
        <div className="flex gap-4 p-4">
            <Avatar
                src={avatar || "gradient-1"}
                size="large"
                className="shadow-lg shadow-violet-500 outline outline-2 outline-offset-0 outline-violet-600"
            />

            <div className="flex flex-col justify-between h-full">
                <div className="flex flex-row gap-1">
                    <TextInput
                        value={urlInput}
                        setValue={setUrlInput}
                        placeholder="Insira url da Imagem..."
                        Icon={<UrlIcon />}
                    />
                    <button
                        onClick={() => uploadUserAvatar(urlInput)}
                        className="bg-black rounded-md  w-14 h-12 flex-center"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            width={28}
                            height={28}
                        >
                            <path
                                d="M320 367.79h76c55 0 100-29.21 100-83.6s-53-81.47-96-83.6c-8.89-85.06-71-136.8-144-136.8-69 0-113.44 45.79-128 91.2-60 5.7-112 43.88-112 106.4s54 106.4 120 106.4h56"
                                fill="none"
                                stroke="white"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="32"
                            />
                            <path
                                fill="none"
                                stroke="white"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="32"
                                d="M320 255.79l-64-64-64 64M256 448.21V207.79"
                            />
                        </svg>
                    </button>
                </div>
                <span className="w-full mb-[5px] mt-[-5px] text-gray-500 text-center">
                    OU
                </span>
                <div className="w-auto flex flex-row gap-1 justify-between">
                    {avatarsGradients.map((gradient) => (
                        <button
                            key={gradient}
                            onClick={() => setAvatar && setAvatar(gradient)}
                            className={`hover:outline focus-visible:outline hover:outline-2 focus-visible:outline-2 hover:outline-offset-1 
                                   focus-visible:outline-offset-1 hover:outline-violet-500 focus-visible:outline-violet-500 hover:opacity-100 
                                   focus-visible:opacity-100
                                   transition-all duration-200 ease-in-out
                                   rounded-sm cursor-pointer ${
                                       avatar === gradient
                                           ? "outline-violet-500 outline-offset-2 outline-[2px] outline"
                                           : "outline-black outline-offset-1 outline-[2px] outline opacity-60"
                                   }`}
                        >
                            <Avatar src={gradient} size="medium" />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
