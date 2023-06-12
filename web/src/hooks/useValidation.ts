import { useState } from "react";

export const useUserValidation = () => {
    const [error, setError] = useState<string | null>(null);

    const validateUserName = (userName: string) => {
        if (userName.length < 3) {
            setError("Username must be at least 3 characters long");
            return false;
        } else if (userName.length >= 50) {
            setError("Username must be less than 50 letters");
            return false;
        }
        setError("");
        return true;
    };

    return {
        validateUserName,
        error,
    };
};
