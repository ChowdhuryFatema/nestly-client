export const dynamic = 'force-dynamic';

import { AllRentalRequests } from "@/components/modules/rentalHouse/AllRentalRequests/AllRentalRequests";
import { getCurrentUser } from "@/services/AuthService";
import { getAllRentalRequests } from "@/services/ListingService";

export default async function Page() {
    
    const currentUser = await getCurrentUser();
    
    if(!currentUser || !currentUser.email){
        return <div>User is not logged in or email is missing.</div>;
    }
    const requests = await getAllRentalRequests();
 return  <AllRentalRequests requests={requests?.data || []}/>
  }