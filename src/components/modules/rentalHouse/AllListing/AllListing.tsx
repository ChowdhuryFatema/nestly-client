/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteRentalHouse, getAllRentalHouses } from "@/services/ListingService";
import Image from "next/image";

interface AllListingProps {
  listings: any[];
}

const AllListing = ({ listings: initialListings }: AllListingProps) => {
  const [listings, setListings] = useState<any[]>(initialListings);
  const [loading, setLoading] = useState(false);

  const fetchListings = async () => {
    setLoading(true);
    try {
      const res = await getAllRentalHouses();
      if (res?.success) {
        setListings(res?.data || []);
      } else {
        toast.error(res?.message || "Failed to load listings");
      }
    } catch (err: any) {
      toast.error("Something went wrong while fetching listings");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteRentalHouse(id);
      if (res?.success) {
        toast.success("Deleted successfully");
        fetchListings();
      } else {
        toast.error(res?.message || "Failed to delete");
      }
    } catch (error: any) {
      toast.error("Error deleting listing");
      console.error(error);
    }
  };

  return (
    <div className="container py-6">
      <h1 className="text-2xl font-semibold mb-4">All Rental Listings</h1>

      <div className="overflow-x-auto border rounded">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Image</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Location</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={4} className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : listings.length > 0 ? (
              listings.map((listing) => (
                <tr key={listing._id}>
                  <td className="px-4 py-2">
                    <Image
                      src={listing?.images?.[0] || "/default.png"}
                      alt="House"
                      width={64}
                      height={64}
                      className="object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-2">{listing.name}</td>
                  <td className="px-4 py-2">{listing.location}</td>
                  <td className="px-4 py-2">
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(listing._id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-4">
                  No listings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllListing;
