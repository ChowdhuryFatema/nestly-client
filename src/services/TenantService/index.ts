"use server";

import { cookies } from "next/headers";
import { TRentalRequest } from "@/types";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_API}/tenants`;


//  Create Rental House
export const createTenantRequest = async (newData: TRentalRequest) => {
  try {
    const res = await fetch(`${BASE_URL}/requests`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: (await cookies()).get("accessToken")!.value,
      },
      body: JSON.stringify(newData),
    });
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};