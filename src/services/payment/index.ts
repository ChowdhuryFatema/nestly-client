"use server";

import { cookies } from "next/headers";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_API}/payment`;


export const createPaymentIntent = async (paymentInfo: any) => {
    const response = await fetch(`${BASE_URL}/payment-intent`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: (await cookies()).get("accessToken")!.value,
          },
        body: JSON.stringify(paymentInfo),
    });
    return response.json();
};

