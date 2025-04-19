import ManageUsers from "@/components/modules/manageUsers/ManageUsers";
import { getAllUsers } from "@/services/Users";
import React from "react";

const AllUsers = async () => {
  const users = await getAllUsers();

  console.log("users", users)

  return (
    <div>
        <ManageUsers users={users?.data} />
    </div>
  );
};

export default AllUsers;
