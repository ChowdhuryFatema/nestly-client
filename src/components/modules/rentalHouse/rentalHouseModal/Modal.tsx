// components/ui/Modal.tsx

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";


  
  interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
    children: React.ReactNode;
    className?: string;
  }
  
  const Modal = ({
    isOpen,
    onClose,
    title,
    description,
    children,
    className,
  }: ModalProps) => {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className={className || "sm:max-w-lg"}>
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
          <div className="mt-4">{children}</div>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default Modal;
  