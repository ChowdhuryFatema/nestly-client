"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_API}`;

//  Create Rental House
export const createRentalHouse = async (formData: FormData) => {
  try {
    const res = await fetch(`${BASE_URL}/listings`, {
      method: "POST",
      body: formData,
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

//  Get All Rental Houses (LANDLORD ONLY)
export const getAllRentalHouses = async () => {
  try {
    const res = await fetch(`${BASE_URL}/listings`, {
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
      next: {
        tags: ["Listings"],
      },
    });
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

//  Update Rental House
export const updateRentalHouse = async (id: string, formData: FormData) => {
  try {
    const res = await fetch(`${BASE_URL}/listings/${id}`, {
      method: "PUT",
      body: formData,
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

//  Delete Rental House
export const deleteRentalHouse = async (id: string) => {
  try {
    const res = await fetch(`${BASE_URL}/listings/${id}`, {
      method: "DELETE",
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

//  Get All Rental Requests (LANDLORD ONLY)
export const getAllRentalRequests = async () => {
  try {
    const res = await fetch(`${BASE_URL}/requestes`, {
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
      next: {
        tags: ["RentalRequests"],
      },
    });
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

//  Handle Rental Request Response (Approve/Reject)
export const handleRentalRequestResponse = async (
  requestId: string,
  action: string // 'approve' or 'reject'
) => {
  try {
    const res = await fetch(`${BASE_URL}/requests/${requestId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: (await cookies()).get("accessToken")!.value,
      },
      body: JSON.stringify({ action }),
    });
    revalidateTag("RentalRequests");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
