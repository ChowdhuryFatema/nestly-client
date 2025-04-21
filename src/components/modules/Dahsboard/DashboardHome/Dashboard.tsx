"use client";

import { TRentalHouse, TUser } from "@/types";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const rentalTrendData = [
  { month: "Jan", value: 200 },
  { month: "Feb", value: 250 },
  { month: "Mar", value: 300 },
  { month: "Apr", value: 400 },
  { month: "May", value: 350 },
  { month: "Jun", value: 450 },
  { month: "Jul", value: 480 },
  { month: "Aug", value: 470 },
  { month: "Sep", value: 490 },
  { month: "Oct", value: 510 },
  { month: "Nov", value: 600 },
  { month: "Dec", value: 580 },
];

const pieData = [
  { name: "Landlords", value: 324 },
  { name: "Tenants", value: 897 },
  { name: "Admins", value: 12 },
  { name: "Guests", value: 190 },
];

const COLORS = ["#60a5fa", "#34d399", "#f472b6", "#facc15"];

type TDashboardProps = {
  allRentalHouses: TRentalHouse[];
  allUsers: TUser[];
};

export default function Dashboard({
  allRentalHouses,
  allUsers,
}: TDashboardProps) {
  const totalLandlord = allUsers?.filter((user) => user.role === "landlord");
  const totalTenant = allUsers?.filter((user) => user.role === "tenant");

  console.log("allUsers", allUsers);

  return (
    <div className="p-6 space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl shadow-md p-4 border">
          <h3 className="text-sm text-gray-500">Total Houses</h3>
          <p className="text-xl font-semibold">{allRentalHouses?.length}</p>
          <p className={`text-xs mt-1 text-primary-500`}>12% increase</p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-4 border">
          <h3 className="text-sm text-gray-500">Total Landlords</h3>
          <p className="text-xl font-semibold">
            {totalLandlord?.length > 0 ? totalLandlord?.length : "5"}
          </p>
          <p className={`text-xs mt-1 text-primary-500`}>5% increase</p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-4 border">
          <h3 className="text-sm text-gray-500">Total Tenants</h3>
          <p className="text-xl font-semibold">
            {totalTenant?.length > 0 ? totalTenant?.length : "1"}
          </p>
          <p className={`text-xs mt-1 text-primary-500`}>1% increase</p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-4 border">
          <h3 className="text-sm text-gray-500">Total Users</h3>
          {allUsers?.length > 0 ? allUsers?.length : "6"}
          <p className={`text-xs mt-1 text-primary-500`}>6% increase</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="bg-white rounded-2xl shadow-md p-4 border h-[250px]">
          <h3 className="text-sm text-gray-500 mb-2">
            Rental Trends (Monthly)
          </h3>
          <ResponsiveContainer width="100%" height="90%">
            <LineChart data={rentalTrendData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#60a5fa"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-2xl shadow-md p-4 border h-[250px]">
          <h3 className="text-sm text-gray-500 mb-2">User Distribution</h3>
          <ResponsiveContainer width="100%" height="90%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                label
              >
                {pieData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
