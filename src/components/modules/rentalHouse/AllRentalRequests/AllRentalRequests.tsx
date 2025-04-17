
type Props = {
  requests: any[];
};

export const AllRentalRequests =  ({requests} : Props) => {
 
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
                <th className="p-2 border">Landlord Phone</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Payment Status</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req: any) => (
                <tr key={req._id} className="hover:bg-gray-50">
                  <td className="p-2 border">{req.tenantName || "N/A"}</td>
                  <td className="p-2 border">{req.landlordPhone}</td>
                  <td className="p-2 border capitalize">{req.status}</td>
                  <td className="p-2 border capitalize">{req.paymentStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

