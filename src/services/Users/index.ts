"use server";
import { cookies } from "next/headers";

export const getAllUsers = async () => {
    try {
        const token = (await cookies()).get("accessToken")?.value || "";

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/admin/users`, {
            method: "GET",
            headers: {
                Authorization: token,
            },
        });

        if (!res.ok) {
            throw new Error(`Error: ${res.status}`);
        }

        return res.json();
    } catch (error: any) {
        return new Error(error.message || "Something went wrong");
    }
};
export const updateProfile = async (formData: {
    name: string;
    phoneNumber: string;
    profileImage: string;
    currentPassword?: string;
    newPassword?: string;
  }) => {
    try {
   
  
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/update-profile`, {
        method: "PUT",
        body: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json",
          Authorization:  (await cookies()).get("accessToken")?.value || "" 
        },
        
      });
  
      const result = await res.json();
  
      if (!res.ok) {
        throw new Error(result?.message || "Something went wrong");
      }
  
      return result;
    } catch (error: any) {
      throw new Error(error?.message || "An error occurred during the update process");
    }
  };
//    try {
//       const res = await fetch(`${BASE_URL}/listings/${id}`, {
//         method: "PUT",
//         body: formData,
//         headers: {
//           Authorization: (await cookies()).get("accessToken")!.value,
//         },
//       });
//       revalidateTag("Listings");
//       return res.json();
//     } catch (error: any) {
//       return Error(error);
//     }
