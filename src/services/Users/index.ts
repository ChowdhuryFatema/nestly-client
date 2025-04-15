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
