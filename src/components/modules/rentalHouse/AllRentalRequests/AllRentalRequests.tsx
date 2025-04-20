"use client"

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { handleRentalRequestResponse } from "@/services/ListingService";
import { TRentalRequest } from "@/types";

type Props = {
  requests: TRentalRequest[];
};



export const AllRentalRequests = ({ requests }: Props) => {
  console.log("requests....", requests);

  const handleStatusChange = async (status: string, id: string) => {
    console.log("status....", status, id);
    try {
      const response =  await handleRentalRequestResponse(id, status)
      console.log("response....", response);
    } catch (error) {
      console.log("error....", error);
    }
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Rental Requests</h2>
      {requests?.length === 0 ? (
        <p>No rental requests found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2 border">Tenant Name</th>
                <th className="p-2 border">Move In Date</th>
                <th className="p-2 border">Rental Duration</th>
                <th className="p-2 border">Message</th>
                <th className="p-2 border">Payment Status</th>
                <th className="p-2 border">Payment Request</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req: TRentalRequest) => (
                <tr key={req._id} className="hover:bg-gray-50">
                  <td className="p-2 border">{req?.tenantId?.name || "N/A"}</td>
                  <td className="p-2 border">{req?.moveInDate || "N/A"}</td>
                  <td className="p-2 border">{req?.rentalDuration || "N/A"}</td>
                  <td className="p-2 border">{req?.message || "N/A"}</td>
                  <td className="p-2 border">{req?.paymentStatus || "N/A"}</td>
                  <td className="p-2 border">

                    <Select onValueChange={(value) => handleStatusChange(value, req?._id)} defaultValue={req?.status}>
                      <SelectTrigger className=" border-gray-200 bg-gray-50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem key={'pending'} value={'pending'}>pending</SelectItem>
                          <SelectItem key={'approved'} value={'approved'}>approved</SelectItem>
                          <SelectItem key={'rejected'} value={'rejected'}>rejected</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

