"use client";

import { DepartmentFormModal } from "@/components/department-form-modal";
import { AccountDetailsModal } from "@/components/modals/account-details-modal";
import { useState, useEffect } from "react";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AccountDetailsModal />
      <DepartmentFormModal />
    </>
  );
};