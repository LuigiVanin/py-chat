import React from "react";

type SizeType = "small" | "medium" | "large";

interface Props {
    src: string;
    size?: SizeType;
    rounded?: boolean;
}

export const Avatar: React.FC<Props> = ({
    src,
    size = "medium",
    rounded = false,
}) => {
    console.log(rounded);
    const sizeTable: Record<SizeType, string> = {
        small: "h-9 w-9 min-w-[2.25rem]",
        medium: "h-12 w-12 min-w-[3rem]",
        large: "h-16 w-16 min-w-[4rem]",
    };
    return (
        <div
            className={`flex items-center justify-center   bg-orange-500 ${
                rounded ? "rounded-full" : "rounded"
            } ${sizeTable[size] || sizeTable.medium}`}
        ></div>
    );
};
