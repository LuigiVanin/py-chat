// import {
//     useAppDispatch as useDispatch,
//     useAppSelector as useSelector,
// } from "../hooks";
// import { setChatMessages } from "../store/chatSlice";

export const useGetMessages = () => {
    // const messages = useSelector((state) => state.chat.messages);
    // const currentChat = useSelector((state) => state.chat.currentChat);

    // const dispatch = useDispatch();
    // Esse hook ira chamar a API via service e irá setar os dados no etado global
    const getMessages = async () => {
        // Aqui irei chamar o serviço
        // dispatch(setChatMessages({ chatName: currentChat, data: [] })
    };
    return { getMessages };
};
