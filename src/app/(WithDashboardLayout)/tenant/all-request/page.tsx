export const dynamic = 'force-dynamic';
import { getAllMyRequests } from "@/services/TenantService";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function AllRequestPage() {
    const myRequests = await getAllMyRequests();
    console.log("myRequests", myRequests);
    return (
        <div className="container py-6">
            <h1 className="text-2xl font-semibold mb-4">All Rental Listings</h1>

            <div className="overflow-x-auto border rounded">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left">Image</th>
                            <th className="px-4 py-2 text-left">Location</th>
                            <th className="px-4 py-2 text-left">Rent Amount</th>
                            <th className="px-4 py-2 text-left">Bed Rooms</th>
                            <th className="px-4 py-2 text-left">Status</th>
                            <th className="px-4 py-2 text-left">Payment Status</th>
                            <th className="px-4 py-2 text-left">Contact Landlord</th>
                            <th className="px-4 py-2 text-left">Payment Option</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {myRequests?.data?.length > 0 ? (
                            myRequests?.data?.map((request: any) => (
                                <tr key={request._id}>
                                    <td className="px-4 py-2">
                                        <Image
                                            src={request?.rentalHouseId?.images?.[0] || "/default.png"}
                                            alt="House"
                                            width={64}
                                            height={64}
                                            className="object-cover rounded"
                                        />
                                    </td>
                                    <td className="px-4 py-2">{request?.rentalHouseId?.location}</td>
                                    <td className="px-4 py-2">{request?.rentalHouseId?.rentAmount}$</td>
                                    <td className="px-4 py-2">{request?.rentalHouseId?.bedrooms}</td>
                                    <td className="px-4 py-2">
                                        <span className={`px-4 py-2 rounded ${request?.status === "approved" ? "bg-green-100 text-green-800" : request?.status === "pending" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}>
                                            {request?.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2"><span className={`px-4 py-2 rounded ${request?.paymentStatus === "paid" ? "bg-green-100 text-green-800" : request?.paymentStatus === "pending" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}>
                                        {request?.paymentStatus}
                                    </span></td>
                                    <td className="px-4 py-2">
                                        {
                                            request?.status === "pending" || request?.status === "rejected" ?
                                                "waiting for landlord approval"
                                                :
                                                request?.landlordId?.phoneNumber
                                        }
                                    </td>
                                    <td className={`px-4 py-2`}
                                    >
                                        <Link href={`/tenant/payment/${request?._id}`}
                                            className={`${request?.status === "pending" || request?.status === "rejected" ? "cursor-not-allowed text-gray-300" : ""}`}
                                        >
                                            <span className="flex items-center">Payment <ArrowRight /></span>
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="text-center py-4">
                                    No listings found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

        </div >
    );
}

