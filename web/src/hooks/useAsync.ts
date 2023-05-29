import { useEffect, useState } from "react";

export const useAsync = <T = any>(
    handler: (...args: any[]) => Promise<T>,
    asap = true
) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [data, setData] = useState<T | null>(null);

    const action = async (...args: any[]): Promise<T> => {
        setLoading(true);
        setError(null);
        try {
            const result = await handler(...args);
            setData(result);
            setLoading(false);

            return result;
        } catch (err) {
            console.log(err);
            setError(err as Error);
            setLoading(false);
            throw err;
        }
    };

    useEffect(() => {
        if (asap) action();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        action,
        loading,
        error,
        data,
    };
};
