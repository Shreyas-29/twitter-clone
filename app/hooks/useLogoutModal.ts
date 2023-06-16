import { create } from "zustand";

interface LogoutModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useLogoutMoal = create<LogoutModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useLogoutMoal;