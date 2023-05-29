export type InnerRoom = Room & { connected: boolean };

export interface Room {
    _id: string;
    name: string;
    image: string;
    description: string;
}
