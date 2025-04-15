"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getAllUsers = async () => {
    try {
        const token = (await cookies()).get("accessToken")?.value || "";

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/admin/users`, {
            method: "GET",
            headers: {
                Authorization: token,
            },
            next: {
                tags: ["USER"]
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

export const deleteUser = async (userId: string) => {
    try {
        const token = (await cookies()).get("accessToken")?.value || "";

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/admin/users/${userId}`, {
            method: "DELETE",
            headers: {
                Authorization: token,
            },
        });

        if (!res.ok) {
            throw new Error(`Failed to delete user: ${res.status}`);
        }
        revalidateTag("USER")

        return { success: true };
    } catch (error: any) {
        return { success: false, message: error.message || "Something went wrong" };
    }
};


export const updateUserRole = async (userId: string, newRole: string) => {
    try {
        const token = (await cookies()).get("accessToken")?.value || "";

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/admin/users/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            body: JSON.stringify({ role: newRole }),
        });

        if (!res.ok) {
            throw new Error(`Failed to update role: ${res.status}`);
        }

        return { success: true };
    } catch (error: any) {
        return { success: false, message: error.message || "Something went wrong" };
    }
};
