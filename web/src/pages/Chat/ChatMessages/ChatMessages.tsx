import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

type Props = {
    roomId: string;
};

export const ChatMessages = () => {
    const params = useParams<Props>();
    useEffect(() => {
        console.log(params.roomId);
    }, [params.roomId]);

    return <div>aaa</div>;
};
