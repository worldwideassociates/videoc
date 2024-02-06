import { User } from "@prisma/client";
import { create } from "zustand";


interface useCurrentUserStore {
  currentUser: User;
  setCurrentUser: (employee: User) => void;
}

export const useCurrentUser = create<useCurrentUserStore>(
  (set) => ({
    currentUser: {} as User,
    setCurrentUser: (currentUser) => set({ currentUser: currentUser }),
  })
);
