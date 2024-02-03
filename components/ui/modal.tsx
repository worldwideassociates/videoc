"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ModalProps {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  Icon?: React.ComponentType<{ size: number, className: string }> | React.ElementType
}

export const Modal: React.FC<ModalProps> = ({
  title,
  description,
  isOpen,
  onClose,
  children,
  Icon
}) => {
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl flex">
            {Icon && <Icon className="mr-2" size={24} />}
            <span>{title}</span></DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
};

