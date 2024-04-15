"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ModalProps {
  title?: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  Icon?:
    | React.ComponentType<{ size: number; className: string }>
    | React.ElementType;
}

export const Modal: React.FC<ModalProps> = ({
  title,
  description,
  isOpen,
  onClose,
  children,
  Icon,
}) => {
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent className="w-full">
        <DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="">
              {Icon && <Icon className="mr-2" size={50} />}
            </div>
            <div className="">
              <DialogTitle className="text-3xl text-gray-800">
                {title}
              </DialogTitle>
              {description && (
                <DialogDescription className="text-lg">
                  {description}
                </DialogDescription>
              )}
            </div>
          </div>
        </DialogHeader>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
};
