"use client";

import { DeleteConfirmModal } from "@/components/ui/core/DeleteConfirmModal";
import { NLTable } from "@/components/ui/core/NLTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  deleteAdminRentalHouse,
  updateRentalStatus,
} from "@/services/ManageRentalHouse";
import { TRentalHouse } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Trash } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

const ManageRentalHouse = ({
  allRentalHouses,
}: {
  allRentalHouses: TRentalHouse[];
}) => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const handleDeleteConfirm = async () => {
    if (!selectedUserId) return;

    try {
      const result = await deleteAdminRentalHouse(selectedUserId);
      if (result.success) {
        toast.success("Rental list deleted successfully!");
        // Optionally trigger re-fetch here
      } else {
        toast.error(result.message || "Something went wrong.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error deleting user.");
    } finally {
      setSelectedUserId(null);
      setOpenModal(false);
    }
  };

  const columns: ColumnDef<TRentalHouse>[] = [
    {
      accessorKey: "location",
      header: "Location",
    },
    {
      accessorKey: "rentAmount",
      header: "RentAmount",
    },
    {
      accessorKey: "bedrooms",
      header: "Bedrooms",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const item: TRentalHouse = row.original;

        const handleStatusChange = async (newStatus: string) => {
          const result = await updateRentalStatus(item?._id as string, newStatus);
          if (result.success) {
            toast.success("Status updated successfully!");
          } else {
            toast.error(result.message);
          }
        };
        const status = ["pending", "approved", "rejected"];
        const getAvailableStatuses = (current: string) => {
          if (current === "approved" || current === "rejected") {
            // "pending" badh dichhi
            return status.filter((s) => s !== "pending");
          }
          return status;
        };

        return (
          <Select
            defaultValue={item?.status}
            onValueChange={handleStatusChange}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {getAvailableStatuses(item?.status as string).map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      },
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => {
        const user = row.original;

        return (
          <button
            onClick={() => {
              setSelectedUserId(user._id!);
              setOpenModal(true);
            }}
            className="text-red-500 cursor-pointer"
            title="Delete"
          >
            <Trash className="w-5 h-5" />
          </button>
        );
      },
    },
  ];

  return (
    <div>
      <NLTable data={allRentalHouses} columns={columns || []} />

      <DeleteConfirmModal
        open={openModal}
        onOpenChange={setOpenModal}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default ManageRentalHouse;
