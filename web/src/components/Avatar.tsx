import React, { useMemo } from "react";

type SizeType = "small" | "medium" | "large";

interface Props {
    src: string;
    size?: SizeType;
    rounded?: boolean;
    className?: string;
}

const gradientTable: Record<string, string> = {
    "gradient-1":
        "bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500",
    "gradient-2": "bg-gradient-to-tr from-green-500 to-blue-500",
    "gradient-3": "bg-gradient-to-tr from-indigo-500  to-orange-300",
    "gradient-4": "bg-gradient-to-tr from-yellow-500 to-emerald-500",
    "gradient-5": "bg-gradient-to-tr from-orange-500  to-pink-600",
    "gradient-6": "bg-gradient-to-tr from-blue-500  to-red-500",
};

export const Avatar: React.FC<Props> = ({
    src,
    size = "medium",
    rounded = false,
    className = "",
}) => {
    const sizeTable: Record<SizeType, string> = {
        small: "h-9 w-9 min-w-[2.25rem]",
        medium: "h-12 w-12 min-w-[3rem]",
        large: "h-16 w-16 min-w-[4rem]",
    };

    const isGradient = (url: string) => {
        return /gradient-[0-9]/.test(url);
    };

    const gradient = useMemo(() => {
        return isGradient(src) ? gradientTable[src] : "bg-orange-500";
    }, [src]);

    return (
        <div
            className={`flex items-center justify-center  relative ${
                rounded ? "rounded-full" : "rounded"
            } ${sizeTable[size] || sizeTable.medium} ${gradient} ${className}`}
        >
            {!isGradient(src) ? (
                <img
                    src={src}
                    className="h-full w-full object-cover object-center"
                />
            ) : (
                ""
            )}
        </div>
    );
};
