"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getAllAdminRentalHouses = async () => {
    try {
        const token = (await cookies()).get("accessToken")?.value || "";

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/admin/listings`, {
            method: "GET",
            headers: {
                Authorization: token,
            },
            next: {
                tags: ["RENTAL_HOUSES"]
            }
        });

        if (!res.ok) {
            throw new Error(`Error: ${res.status}`);
        }

        return res.json();
    } catch (error: any) {
        return new Error(error.message || "Something went wrong");
    }
};


export const updateRentalStatus = async (userId: string, newStatus: string) => {
    try {
        const token = (await cookies()).get("accessToken")?.value || "";

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/admin/listings/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            body: JSON.stringify({ status: newStatus }),
        });

        if (!res.ok) {
            throw new Error(`Failed to update status: ${res.statusText}`);
        }
        revalidateTag("RENTAL_HOUSES")
        return { success: true };
    } catch (error: any) {
        return { success: false, message: error.message || "Something went wrong" };
    }
};


export const deleteAdminRentalHouse = async (userId: string) => {
    try {
        const token = (await cookies()).get("accessToken")?.value || "";

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/admin/listings/${userId}`, {
            method: "DELETE",
            headers: {
                Authorization: token,
            },
        });

        if (!res.ok) {
            throw new Error(`Failed to delete user: ${res.status}`);
        }
        revalidateTag("RENTAL_HOUSES")

        return { success: true };
    } catch (error: any) {
        return { success: false, message: error.message || "Something went wrong" };
    }
};



