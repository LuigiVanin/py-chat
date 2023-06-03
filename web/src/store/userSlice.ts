import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { User } from "../types/user";
import { UserLocalStorage } from "../helpers/localStorageProxy";

type UserState = User;

const initialState: UserState = {
    username: null,
    id: null,
    avatar: null,
};

export const userSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            const storage = new UserLocalStorage();
            state.username = action.payload.username;
            state.id = action.payload.id;
            state.avatar = action.payload.avatar;

            storage.user = action.payload;
        },
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
