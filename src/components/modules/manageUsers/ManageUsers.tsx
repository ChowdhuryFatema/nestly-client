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
import { deleteUser, updateUserRole } from "@/services/Users";
import { TUser } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Trash } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

const ManageUsers = ({ users }: { users: TUser[] }) => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);

  // const handleDelete = async (userId: string) => {
  //   try {
  //     const confirm = window.confirm(
  //       "Are you sure you want to delete this user?"
  //     );
  //     if (!confirm) return;

  //     const result = await deleteUser(userId);

  //     if (result.success) {
  //       // Optionally re-fetch users or update state
  //       // alert("User deleted");
  //       setOpenModal(true);
  //     } else {
  //       alert(result.message);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     alert("Error deleting user.");
  //   }
  // };

  const handleDeleteConfirm = async () => {
    if (!selectedUserId) return;

    try {
      const result = await deleteUser(selectedUserId);
      if (result.success) {
        toast.success("User deleted successfully!");
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

  const columns: ColumnDef<TUser>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => {
        const user = row.original;

        const handleRoleChange = async (newRole: string) => {
          const result = await updateUserRole(user?._id, newRole);
          if (result.success) {
            toast.success("User role updated successfully!");
          } else {
            toast.error(result.message);
          }
        };
        const roles = ["admin", "landlord", "tenant"];
        return (
          <Select defaultValue={user.role} onValueChange={handleRoleChange}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              {roles.map((role) => (
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
              setSelectedUserId(user._id);
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
      <NLTable data={users} columns={columns || []} />

      <DeleteConfirmModal
        open={openModal}
        onOpenChange={setOpenModal}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default ManageUsers;
