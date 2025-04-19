"use server";

import { cookies } from "next/headers";
import { TRentalRequest } from "@/types";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_API}/tenants`;


//  Create Rental House
export const createTenantRequest = async (formData: TRentalRequest) => {
    try {
      const res = await fetch(`${BASE_URL}/requests`, {
        method: "POST",
        body: JSON.stringify(formData), 
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      });
      revalidateTag("Listings");
      return res.json();
    } catch (error: any) {
      return Error(error);
    }
  };

  // Get All Requests
  export const getAllMyRequests = async () => {
    try {
      const res = await fetch(`${BASE_URL}/requests`, {
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      });
      return res.json();
    } catch (error: any) {
      return Error(error);
    }
  };
