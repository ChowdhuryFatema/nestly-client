"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteConfirmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  open,
  onOpenChange,
  onConfirm,
  title = "Are you sure?",
  description = "This action cannot be undone. This will permanently delete the item.",
}) => {
  const handleDelete = () => {
    onConfirm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg">{title}</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-gray-500">{description}</p>
        <DialogFooter className="mt-4 flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="text-gray-700 cursor-pointer"
          >
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} className="cursor-pointer">
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
