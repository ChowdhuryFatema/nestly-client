"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_API}/landlords`;

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


// Get All Rental Houses (PUBLIC)
// export const getAllPublicRentalHouses = async () => {
//   try {
//     const res = await fetch(`${BASE_URL}/listings`, {
//       next: {
//         tags: ["Listings"],
//       },
//     });
//     return res.json();
//   } catch (error: any) {
//     return Error(error);
//   }
// };

export const getAllPublicRentalHouses = async (filters: { key: string; value: string }[]) => {
  try {
    const params = new URLSearchParams();
    filters.forEach((filter) => {
      if (filter.value) params.append(filter.key, filter.value);
    });

    const res = await fetch(`${BASE_URL}/listings?${params.toString()}`);
    return res.json();
  } catch (error) {
    console.log(error)
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
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
