"use client";

import { useAccountDetailsModal } from "@/hooks/use-account-details-modal";
import { User } from "@prisma/client";
import { useEffect } from "react";

interface Props {
  user: User;
}

export const CheckAccountDetails: React.FC<Props> = ({ user }) => {
  const isOpen = useAccountDetailsModal((state) => state.isOpen);
  const onOpen = useAccountDetailsModal((state) => state.onOpen);

  useEffect(() => {
    if (!isOpen && !user.role) {
      onOpen();
    }
  }, [isOpen, onOpen, user]);

  return null;
};