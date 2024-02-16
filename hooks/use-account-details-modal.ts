import { create } from "zustand";

interface useAccountDetailsModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useAccountDetailsModal = create<useAccountDetailsModalStore>(
  (set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  })
);