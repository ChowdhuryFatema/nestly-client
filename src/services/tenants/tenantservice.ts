/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { cookies } from "next/headers";


const BASE_URL = process.env.NEXT_PUBLIC_BASE_API;


// Define or import TRentalRequestFormInput
type TRentalRequestFormInput = {
  // Add appropriate fields here
  field1: string;
  field2: number;
};

export const createTenantRequest = async (data: TRentalRequestFormInput) => {
  try {
    const token = (await cookies()).get("accessToken")?.value;

    const res = await fetch(`${BASE_URL}/tenants/requests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token || "",
      },
      body: JSON.stringify(data),
    });

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const getAllTenantRequests = async () => {
  try {
    const token = (await cookies()).get("accessToken")!.value; 

    const res = await fetch(`${BASE_URL}/tenants/requests`, {
      method: "GET",
      headers: {
        Authorization: token || "", 
      },
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    console.error("Get All Tenant Requests Error:", error);
    return Error(error);
  }
};

