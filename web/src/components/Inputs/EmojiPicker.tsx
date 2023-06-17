import { Popover, Transition } from "@headlessui/react";
import EmojiPicker, { EmojiClickData, EmojiStyle } from "emoji-picker-react";
import { Fragment } from "react";

interface Props {
    selectEmoji: (emoji: EmojiClickData) => void;
}

export const EmojiPickerWrapper: React.FC<Props> = ({ selectEmoji }) => {
    return (
        <Popover>
            <Popover.Button className="relative w-[37px] h-[37px] flex-center rounded-[12px] border-solid border-[#c5c5c5] border-[1px]">
                <svg
                    width="21"
                    height="21"
                    viewBox="0 0 19 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M7.04677 9.17486C7.73206 9.17486 8.28718 8.45495 8.28718 7.56798C8.28718 6.681 7.73206 5.9611 7.04677 5.9611C6.36149 5.9611 5.80637 6.681 5.80637 7.56798C5.80637 8.45495 6.36149 9.17486 7.04677 9.17486ZM4.28496 10.2903C4.26254 10.0389 4.17204 14.5639 9.51121 14.8366C14.74 14.6319 14.74 10.2903 14.74 10.2903C9.50086 11.45 4.28496 10.2903 4.28496 10.2903ZM14.0798 11.1978C14.0798 11.1978 13.5031 12.8022 9.72584 12.8022C6.70456 12.8022 5.08144 11.8489 4.89266 11.1978C4.89266 11.1978 9.98875 12.0618 14.0798 11.1978ZM9.33191 0.5C3.99188 0.5 0 4.61302 0 9.68673C0 14.7604 4.15997 18.5 9.5 18.5C14.84 18.5 19 14.7604 19 9.68673C19.0009 4.61302 14.6719 0.5 9.33191 0.5ZM9.50086 17.1609C4.95559 17.1609 1.41453 13.9783 1.41453 9.65971C1.41453 5.34111 4.81249 1.83989 9.35777 1.83989C13.903 1.83989 17.5881 5.34111 17.5881 9.65971C17.5872 13.9775 14.0461 17.1609 9.50086 17.1609ZM12.1799 9.17486C12.8652 9.17486 13.4203 8.45495 13.4203 7.56798C13.4203 6.681 12.8652 5.9611 12.1799 5.9611C11.4946 5.9611 10.9395 6.681 10.9395 7.56798C10.9395 8.45495 11.4946 9.17486 12.1799 9.17486Z"
                        fill="#c5c5c5"
                    />
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
                <Popover.Panel className="absolute bottom-[90px] left-5 z-10 mt-3 w-auto h-auto shadow-xl rounded-md border-[1px] border-solid border-gray-200 bg-white">
                    <EmojiPicker
                        height={350}
                        lazyLoadEmojis
                        emojiStyle={EmojiStyle.NATIVE}
                        previewConfig={{ showPreview: false }}
                        onEmojiClick={(emojiObject, _) =>
                            selectEmoji(emojiObject)
                        }
                    />
                </Popover.Panel>
            </Transition>
        </Popover>
    );
};
