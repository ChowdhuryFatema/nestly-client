;
import UpdateProfileForm from "@/components/modules/updateProfileForm/updateProfileForm";
import { getCurrentUser } from "@/services/AuthService";

export default async function Page() {
    
    const currentUser = await getCurrentUser();
    
    if(!currentUser || !currentUser.email){
        return <div>User is not logged in or email is missing.</div>;
    }
   return <UpdateProfileForm/>
  }