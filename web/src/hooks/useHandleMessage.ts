import { useAppDispatch } from "../hooks";
import { addChatMessage } from "../store/chatSlice";
import { setCurrentRoom, editRoom } from "../store/roomSlice";

const useHandleMessage = () => {
    const dispatch = useAppDispatch();
};
