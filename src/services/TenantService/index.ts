"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { TRentalRequest } from "@/types";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_API}/tenants`;


//  Create Rental House
export const createTenantRequest = async (formData: TRentalRequest) => {
    try {
      const res = await fetch(`${BASE_URL}/requests`, {
        method: "POST",
        body: JSON.stringify(formData), 
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      });
      revalidateTag("Listings");
      return res.json();
    } catch (error: any) {
      return Error(error);
    }
  };