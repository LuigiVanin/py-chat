import React from "react";

interface Props {
    src: string;
    size?: "small" | "medium" | "large" | "nothing";
}

export const Avatar: React.FC<Props> = ({ src }) => {
    return (
        <div className="flex items-center justify-center h-12 w-12 min-w-[3rem] bg-orange-500 rounded"></div>
    );
};
