'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts'

const stats = [
  { title: "Total Houses", value: "1,254", change: "12% increase", color: "text-green-500" },
  { title: "Total Landlords", value: "324", change: "5% increase", color: "text-green-500" },
  { title: "Total Tenants", value: "897", change: "7% increase", color: "text-green-500" },
  { title: "Total Users", value: "1,423", change: "10% increase", color: "text-green-500" },
]

const rentalTrendData = [
  { month: 'Jan', value: 200 },
  { month: 'Feb', value: 250 },
  { month: 'Mar', value: 300 },
  { month: 'Apr', value: 400 },
  { month: 'May', value: 350 },
  { month: 'Jun', value: 450 },
  { month: 'Jul', value: 480 },
  { month: 'Aug', value: 470 },
  { month: 'Sep', value: 490 },
  { month: 'Oct', value: 510 },
  { month: 'Nov', value: 600 },
  { month: 'Dec', value: 580 },
]

const pieData = [
  { name: "Landlords", value: 324 },
  { name: "Tenants", value: 897 },
  { name: "Admins", value: 12 },
  { name: "Guests", value: 190 },
]

const COLORS = ['#60a5fa', '#34d399', '#f472b6', '#facc15']

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-md p-4 border">
            <h3 className="text-sm text-gray-500">{stat.title}</h3>
            <p className="text-xl font-semibold">{stat.value}</p>
            <p className={`text-xs mt-1 ${stat.color}`}>{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="bg-white rounded-2xl shadow-md p-4 border h-[250px]">
          <h3 className="text-sm text-gray-500 mb-2">Rental Trends (Monthly)</h3>
          <ResponsiveContainer width="100%" height="90%">
            <LineChart data={rentalTrendData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#60a5fa" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-2xl shadow-md p-4 border h-[250px]">
          <h3 className="text-sm text-gray-500 mb-2">User Distribution</h3>
          <ResponsiveContainer width="100%" height="90%">
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={80} label>
                {pieData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
