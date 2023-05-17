import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

type Props = {
    roomId: string;
};

export const ChatMessages = () => {
    const params = useParams<Props>();
    console.log("New shit", params.roomId);
    useEffect(() => {
        console.log(params.roomId);
    }, [params.roomId]);

    return (
        <div>
            <h1>{params.roomId}</h1>
            <Link to={`/chat/${params.roomId + "a"}`}> next </Link>
            <Link to={`/`}> back </Link>
        </div>
    );
};
