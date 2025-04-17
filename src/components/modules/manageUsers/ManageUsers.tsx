"use client";

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
import React from "react";
import { toast } from "sonner";

const ManageUsers = ({ users }: { users: TUser[] }) => {
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
            alert(result.message);
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

        console.log("user from delete", user);

        const handleDelete = async (userId: string) => {
          try {
            const confirm = window.confirm(
              "Are you sure you want to delete this user?"
            );
            if (!confirm) return;

            const result = await deleteUser(userId);

            if (result.success) {
              // Optionally re-fetch users or update state
              alert("User deleted");
            } else {
              alert(result.message);
            }
          } catch (err) {
            console.error(err);
            alert("Error deleting user.");
          }
        };

        return (
          <button
            onClick={() => handleDelete(user?._id)}
            className="text-red-500"
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
    </div>
  );
};

export default ManageUsers;
