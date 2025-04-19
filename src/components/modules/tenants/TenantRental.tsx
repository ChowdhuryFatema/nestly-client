"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getAllTenantRequests } from "@/services/tenants/tenantservice";

type TenantRequest = {
  _id: string;
  rentalHouseId: string;
  message: string;
  status: string;
  paymentStatus: string;
};

const TenantRental = () => {
  const [requests, setRequests] = useState<TenantRequest[]>([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const data = await getAllTenantRequests();
      console.log("Fetched data: ", data);
  
      if (data?.success && Array.isArray(data.data)) {
        setRequests(data.data);
      }
    };
    fetchRequests();
  }, []);
  
 console.log("requests....", requests);
  return (
    <div className="max-w-6xl mx-auto p-6 mt-8">
      <Card className="overflow-x-auto shadow-xl rounded-2xl p-4">
        <h2 className="text-2xl font-semibold mb-6">My Rental Requests</h2>
        <table className="min-w-full text-sm text-left border rounded-xl">
          <thead className="bg-gray-100 dark:bg-gray-800 text-primary-500 dark:text-gray-300">
            <tr>
              <th className="px-4 py-3">Rental House ID</th>
              <th className="px-4 py-3">Message</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Payment Status</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {requests.length > 0 ? (
              requests.map((request) => (
                <tr key={request._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{request.rentalHouseId}</td>
                  <td className="px-4 py-2">{request.message}</td>
                  <td className="px-4 py-2 capitalize">{request.status}</td>
                  <td className="px-4 py-2 capitalize">{request.paymentStatus}</td>
                  <td className="px-4 py-2 text-center">
                    {request.status === "approved" ? (
                      <Button className="w-full text-primary-500">Proceed to Payment</Button>
                    ) : (
                      <span className="text-gray-400 italic ">Pending approval</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  No rental requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default TenantRental;
