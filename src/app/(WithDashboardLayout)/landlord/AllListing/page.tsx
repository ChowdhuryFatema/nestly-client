import AllListing from "@/components/modules/rentalHouse/AllListing/AllListing";
import { getAllRentalHouses } from "@/services/ListingService";

export default async function Page() {
    const listings = await getAllRentalHouses();
    return <AllListing listings = {listings?.data || []} />;
  }