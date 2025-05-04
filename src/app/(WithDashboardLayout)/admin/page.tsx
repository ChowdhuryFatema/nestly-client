export const dynamic = 'force-dynamic';
import Dashboard from "@/components/modules/Dahsboard/DashboardHome/Dashboard";
import { getAllPublicRentalHouses } from "@/services/ListingService";
import { getAllUsers } from "@/services/Users";
import React from "react";

const AdminHomePage = async () => {
  const allRentalHouses = await getAllPublicRentalHouses([]);
  const allUsers = await getAllUsers();

  return (
    <div>
      <h1 className="text-xl font-bold pl-7">Admin Dashboard</h1>
      <Dashboard allRentalHouses={allRentalHouses?.data} allUsers={allUsers?.data} />
    </div>
  );
};

export default AdminHomePage;
