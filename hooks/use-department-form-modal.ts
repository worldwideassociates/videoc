import { create } from "zustand";

interface useDepartmentFormModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useDepartmentFormModal = create<useDepartmentFormModalStore>(
  (set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  })
);