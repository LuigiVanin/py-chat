import { useAppDispatch } from "../hooks";
import { setUser } from "../store/userSlice";
import { generateUuid } from "../helpers/uuid";
import { useNavigate } from "react-router-dom";

export const useSubmitUser = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    return {
        action: (username: string, avatar: string) => {
            const id = generateUuid();
            dispatch(setUser({ username, avatar, id }));
            navigate("/chat");
        },
    };
};
