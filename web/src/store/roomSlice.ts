import { InnerRoom, Room } from "../types/chat";
import { PayloadAction as Act, createSlice } from "@reduxjs/toolkit";

interface RoomState {
    rooms: InnerRoom[] | null;
    currentRoom: string | null;
    connected: Record<string, boolean>;
}

const initialRoomSatate: RoomState = {
    rooms: null,
    currentRoom: null,
    connected: {},
};

export const roomSlice = createSlice({
    name: "rooms",
    initialState: initialRoomSatate,
    reducers: {
        setRooms: (state, action: Act<Room[]>) => {
            console.log(action.payload);
            state.rooms = action.payload.map((room) => ({
                ...room,
                connected: false,
            }));
        },
        setCurrentRoom: (state, action: Act<string | null>) => {
            state.currentRoom = action.payload || null;
        },
    },
});

export const { setCurrentRoom, setRooms } = roomSlice.actions;
export default roomSlice.reducer;
