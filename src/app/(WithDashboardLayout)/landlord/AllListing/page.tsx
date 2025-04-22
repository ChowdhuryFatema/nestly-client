import AllListing from "@/components/modules/rentalHouse/AllListing/AllListing";
import { getCurrentUser } from "@/services/AuthService";
import { getRentalHousesByEmail } from "@/services/ListingService";


export default async function Page() {
    
    const currentUser = await getCurrentUser();
    if(!currentUser || !currentUser.email){
        return <div>User is not logged in or email is missing.</div>;
    }
    const listings = await getRentalHousesByEmail(currentUser.email);
    console.log(currentUser);
    console.log("Listings......",listings);
    return <AllListing listings = {listings?.data || []} />;
  }