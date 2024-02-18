"use client";

import { useState, useEffect, use } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { LocaleContext } from "@/providers/locale-provider";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  title?: string;
  description?: string;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  onClose,
  isOpen,
  onConfirm,
  loading,
  title,
  description,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const { dictionary: t } = use(LocaleContext);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Modal
      title={title ?? "Are you sure?"}
      description={description ?? "This action cannot be undone."}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button variant="outline" disabled={loading} onClick={onClose}>
          {t.alertModal.cancelButton}
        </Button>
        <Button variant="destructive" disabled={loading} onClick={onConfirm}>
          {t.alertModal.confirmButton}
        </Button>
      </div>
    </Modal>
  );
};