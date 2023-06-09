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
    name: "user",
    initialState,
    reducers: {
        clearUser: (state) => {
            const storage = new UserLocalStorage();
            state.username = null;
            state.id = null;
            state.avatar = null;
            storage.removeUser();
        },
        setUser: (state, action: PayloadAction<User>) => {
            const storage = new UserLocalStorage();
            state.username = action.payload.username;
            state.id = action.payload.id;
            state.avatar = action.payload.avatar;

            storage.setUser(action.payload);

            console.log(state.username, state.id); // <-- The console show the data as existed;
        },
        fetchUser: (state) => {
            const storage = new UserLocalStorage();
            const user = storage.getUser();
            if (user) {
                state.username = user.username;
                state.id = user.id;
                state.avatar = user.avatar;
            }
        },
    },
});

export const { setUser, fetchUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
