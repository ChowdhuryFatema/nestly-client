
import RentalRequestForm from "@/components/modules/tenants/RentalRequestForm";
import { getCurrentUser } from "@/services/AuthService";

export default async function Page() {
    
    const currentUser = await getCurrentUser();
    console.log(currentUser);
    
    if(!currentUser || !currentUser.email){
        return <div>User is not logged in or email is missing.</div>;
    }
   return <RentalRequestForm/>
  }