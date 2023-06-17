import { FormEvent, useState } from "react";
import { EmojiPickerWrapper as EmojiPicker } from "../Inputs/EmojiPicker";
import { EmojiClickData } from "emoji-picker-react";
import { useAppSelector } from "../../hooks";
import { toast } from "react-hot-toast";

interface Props {
    onSubmitMessage: (message: string) => Promise<void>;
}

export const ChatInputBox: React.FC<Props> = ({ onSubmitMessage }) => {
    const [messageText, setMessageText] = useState("");
    const [focus, setFocus] = useState(false);
    const [loading, setLoading] = useState(false);
    const { currentRoom } = useAppSelector((state) => state.room);

    const submitMessage = async (event: FormEvent) => {
        event.preventDefault();
        if (!messageText || loading) return;
        if (!currentRoom) {
            toast.error("Você precisa estar em uma sala para enviar mensagens");
            return;
        }
        setLoading(true);
        try {
            await onSubmitMessage(messageText);
        } finally {
            setLoading(false);
            setMessageText("");
        }
    };

    const addEmoji = (emojiObject: EmojiClickData) =>
        setMessageText((prev) => prev + emojiObject.emoji);

    return (
        <form
            className={`w-full bg-white h-[55px] rounded-lg flex items-center px-2 custom-box-shadow gap-2 ${
                focus ? "outline-2 outline outline-black" : ""
            }`}
            onSubmit={submitMessage}
        >
            <EmojiPicker selectEmoji={addEmoji} />
            <span className="w-[1px] h-2/3 bg-[#dadada]" />
            <input
                type="text"
                className="flex-1 h-8 outline-none text-xl"
                placeholder="Escreva sua Mensagem..."
                maxLength={200}
                value={messageText}
                onInput={(event) => setMessageText(event.currentTarget.value)}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                disabled={loading}
            />
            <button
                disabled={loading}
                className="h-[37px] min-w-[27px] w-24 flex-center gap-2   text-white rounded-[9px] special-button"
                onClick={submitMessage}
            >
                <span className="">Send</span>
                <svg
                    width="18"
                    height="19"
                    viewBox="0 0 18 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M17.917 2.85405C18.346 1.45987 17.0401 0.154 15.646 0.582978L1.2829 5.00238C-0.283882 5.48446 -0.461544 7.6312 1.00466 8.36431L7.09201 11.408L10.1357 17.4953C10.8688 18.9616 13.0155 18.7839 13.4976 17.2171L17.917 2.85405ZM1.81728 6.73907L16.1803 2.31968L11.7609 16.6827L8.87453 10.91L12.8849 6.89969C13.2397 6.54489 13.2397 5.96964 12.8849 5.61484C12.5301 5.26004 11.9549 5.26004 11.6 5.61484L7.58963 9.62526L1.81728 6.73907Z"
                        fill="white"
                    />
                </svg>
            </button>
        </form>
    );
};
