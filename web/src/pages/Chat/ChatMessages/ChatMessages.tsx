import { Link, useParams } from "react-router-dom";

type Props = {
    roomId: string;
};

export const ChatMessages = () => {
    const params = useParams<Props>();

    return (
        <div>
            <h1>{params.roomId}</h1>
            <Link to={`/chat/${params.roomId + "a"}`}> next </Link>
            <Link to={`/`}> back </Link>
        </div>
    );
};
