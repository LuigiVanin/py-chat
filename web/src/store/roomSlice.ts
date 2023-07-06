import { InnerRoom, Room } from "../types/chat";
import { PayloadAction as Act, createSlice } from "@reduxjs/toolkit";

interface RoomState {
    rooms: InnerRoom[] | null;
    currentRoom: string | null;
    connected: Record<string, number>;
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
            state.rooms = action.payload.map((room) => ({
                ...room,
                connected: false,
            }));
        },
        clearRooms: (state) => {
            state.rooms = initialRoomSatate.rooms;
            state.currentRoom = initialRoomSatate.currentRoom;
            state.connected = initialRoomSatate.connected;
        },
        editRoom: (
            state,
            action: Act<{ id: string; status: "connect" | "disconnect" }>
        ) => {
            if (!state.rooms) return;
            const idx = state.rooms.findIndex(
                (room) => room._id === action.payload.id
            );
            state.rooms[idx].connected = action.payload.status === "connect";
        },
        editRoomMembersCount: (
            state,
            action: Act<{ id: string; amount: number }>
        ) => {
            if (!state.rooms) return;
            state.connected[action.payload.id] = action.payload.amount;
        },
        setCurrentRoom: (state, action: Act<string | null>) => {
            state.currentRoom = action.payload || null;
        },
    },
});

export const {
    setCurrentRoom,
    setRooms,
    editRoom,
    editRoomMembersCount,
    clearRooms,
} = roomSlice.actions;
export default roomSlice.reducer;
