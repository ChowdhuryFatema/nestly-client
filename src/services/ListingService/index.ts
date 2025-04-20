"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { TRentalHouse } from "@/types/RentalHouse.type";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_API}/landlords`;

//  Create Rental House
export const createRentalHouse = async (data: TRentalHouse) => {
  console.log("data", data);
  try {
    const res = await fetch(`${BASE_URL}/listings`, {
      method: "POST",
      body: JSON.stringify(data),
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


export const getRentalHouseById = async (id: string) => {
  try {
    const res = await fetch(`${BASE_URL}/SingleListing/${id}`, {
      method: "GET",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
    }); 
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};



// export const getAllPublicRentalHouses = async (filters: { key: string; value: string }[]) => {
//   try {
//     const params = new URLSearchParams();
//     filters.forEach((filter) => {
//       if (filter.value) params.append(filter.key, filter.value);
//     });

//     const res = await fetch(`${BASE_URL}/listings?${params.toString()}`);
//     return res.json();
//   } catch (error) {
//     console.log(error)
//   }
// };

export const getAllPublicRentalHouses = async (filters: { key: string; value: string }[]) => {
  try {
    const params = new URLSearchParams();
    filters.forEach((filter) => {
      if (filter.value) params.append(filter.key, filter.value);
    });

    const res = await fetch(`${BASE_URL}/listings?${params.toString()}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`API error: ${res.status} - ${text}`);
    }

    const contentType = res.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      const text = await res.text();
      throw new Error(`Expected JSON, got: ${text}`);
    }

    return res.json();
  } catch (error) {
    console.error("Failed to fetch rental houses:", error);
    return { data: [] }; // or throw again, depending on how you want to handle fallback
  }
};




export const getRentalHousesByEmail = async (email: string) => {
  try {
    const res = await fetch(`${BASE_URL}/listings/${email}`, {
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
    });

    // if (!res.ok) {
    //   const errorMessage = await res.text();
    //   console.error("Error fetching listings:", errorMessage);
    //   return { success: false, message: `Error: ${res.status} - ${res.statusText}` };
    // }

    // If successful, parse the response as JSON
    const result = await res.json();

    return result;
  } catch (error: any) {
    console.error("Error during fetch:", error);
    return { success: false, message: "An error occurred while fetching rental houses." };
  }
};

//  Update Rental House
export const updateRentalHouse = async (id: string, data: TRentalHouse) => {
  try {
    const res = await fetch(`${BASE_URL}/listings/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
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
    const res = await fetch(`${BASE_URL}/requests`, {
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
    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};


