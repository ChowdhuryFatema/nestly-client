export const dynamic = 'force-dynamic';
import ManageUsers from "@/components/modules/manageUsers/ManageUsers";
import { getAllUsers } from "@/services/Users";
import React from "react";

const AllUsers = async () => {
  const users = await getAllUsers();

  return (
    <div>
        <ManageUsers users={users?.data} />
    </div>
  );
};

export default AllUsers;
