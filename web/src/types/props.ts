export interface SidebarProps {
    loading: boolean;
    connect: (roomId: string) => void;
    disconnect: (roomId: string) => void;
}
