/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { useState } from "react";
import { toast } from "sonner";
import { Pencil, Trash, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteRentalHouse } from "@/services/ListingService";
import Image from "next/image";
import Link from "next/link";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface AllListingProps {
  listings: any[];
}

const ITEMS_PER_PAGE = 10;

const AllListing = ({ listings: initialListings }: AllListingProps) => {
  const [listings, setListings] = useState<any[]>(initialListings);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(listings.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentListings = listings.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteRentalHouse(id);
      if (res?.success) {
        toast.success("Deleted successfully");
        setListings(listings.filter((listing) => listing._id !== id));
      } else {
        toast.error(res?.message || "Failed to delete");
      }
    } catch (error: any) {
      toast.error("Error deleting listing");
      console.error(error);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };


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
              <th className="px-4 py-2 text-left">Edit</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : currentListings.length > 0 ? (
              currentListings.map((listing) => (
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
                  <td className="px-4 py-2">{listing.location}</td>
                  <td className="px-4 py-2">{listing.rentAmount}</td>
                  <td className="px-4 py-2">{listing.bedrooms}</td>
                  <td className="px-4 py-2">
                    <span className={`px-4 py-2 rounded ${listing.status === "approved" ? "bg-green-100 text-green-800" : listing.status === "pending" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}>
                      {listing.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <Link href={`/landlord/update-rental/${listing._id}`}>
                      <Button
                        size="sm"
                        variant="outline"
                        // onClick={() => handleEdit(listing._id)}
                        className="text-blue-500 hover:text-blue-600 cursor-pointer"
                      >
                        <Pencil size={16} />
                      </Button>
                    </Link>
                  </td>

                  <td className="px-4 py-2">
                    {/* <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(listing._id)}
                      className=" cursor-pointer"
                    > */}

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline"><Trash2 size={16} /></Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently remove your data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(listing._id)}>Continue</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>

                    {/* </Button> */}
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

      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded bg-gray-200 ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-300"
            }`}
        >
          {'<'}
        </button>
        <span className="text-sm font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded bg-gray-200 ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-300"
            }`}
        >
          {'>'}
        </button>
      </div>
    </div>
  );
};

export default AllListing;
