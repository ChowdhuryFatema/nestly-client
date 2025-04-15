import { NLTable } from "@/components/ui/core/NLTable";
import { TUser } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

const ManageUsers = ({ users }: { users: TUser }) => {
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
    },
    // {
    //   accessorKey: "action",
    //   header: () => <div>Action</div>,
    //   cell: ({ row }) => (
    //     <button className="text-red-500" title="Delete">
    //       <Trash className="w-5 h-5" />
    //     </button>
    //   ),
    // },
  ];

  return (
    <div>
      <NLTable data={users} columns={columns} />
    </div>
  );
};

export default ManageUsers;
