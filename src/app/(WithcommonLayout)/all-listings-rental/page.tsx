export const dynamic = 'force-dynamic';
import React from "react";
import AllListingsRentalHouse from '@/components/modules/rentalHouse/AllListingsRental/AllListingsRentalHouse';
import { getAllPublicRentalHouses } from "@/services/ListingService";

const AllListingsRental = async() => {
 
    const filters: { key: string; value: string }[] = [{key: "status", value: "approved"}];
    const allRentalHouses = await getAllPublicRentalHouses(filters);

    console.log("allRentalHouses", allRentalHouses)
  
  return (
    <div>
      <AllListingsRentalHouse rentalHouses={allRentalHouses?.data || []} />
    </div>
  );
};

export default AllListingsRental;
