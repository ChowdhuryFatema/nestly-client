import Dashboard from "@/components/modules/Dahsboard/DashboardHome/Dashboard";
import React from "react";
// import DashboardLayout from "../Layout";

const UserHomePage = () => {
  return (
    <div>
      <h1 className='text-xl font-bold pl-7'>Tenant Dashboard</h1>
      <Dashboard/>
    </div>
  );
};

export default UserHomePage;
