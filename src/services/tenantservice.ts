/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API;

// Get the access token from cookies
const getToken = async () => {
  return (await cookies()).get("accessToken")?.value;
};

export const createTenantRequest = async (data: FieldValues) => {
  try {
    const token = await getToken();

    const res = await fetch(`${BASE_URL}/tenants/requests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    console.error("Create Tenant Request Error:", error);
    return Error(error);
  }
};

export const getAllTenantRequests = async () => {
  try {
    const token = await getToken();

    const res = await fetch(`${BASE_URL}/tenants/requests`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    console.error("Get All Tenant Requests Error:", error);
    return Error(error);
  }
};

