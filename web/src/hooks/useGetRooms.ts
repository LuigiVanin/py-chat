import { Room } from "./../types/chat";
import { api } from "../helpers/api";
import { useAsync } from "./useAsync";
import { useAppDispatch } from "../hooks";
import { setRooms } from "../store/roomSlice";

export const useGetRooms = () => {
    const dispatch = useAppDispatch();

    const { action, loading, error } = useAsync(async () => {
        const res = await api.get<Room[]>("/chat/", {});
        return res;
    });
    const getRooms = async () => {
        const res = await action();
        if (Array.isArray(res.data)) {
            console.log("SETING ROOMS UP");
            dispatch(setRooms(res.data));
        }
        console.log(res.data);
        // console.log(res.data);
        return res.data;
    };
    return { getRooms, loading, error };
};
