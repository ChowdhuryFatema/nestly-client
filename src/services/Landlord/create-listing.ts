"use server";
import { cookies } from "next/headers";

export const createListing = async (data: any) => {

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/landlords/listings`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${(await cookies()).get("accessToken")?.value}`,
            },
        });
        return response.json();
    } catch (error) {
        console.error(error);
    }
}
