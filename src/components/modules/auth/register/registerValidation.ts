import { z } from "zod";

export const registrationSchema = z.object({
    name: z.string({
        required_error: "Name is required",
    }).min(2, { message: "Name must be at least 2 characters" }),

    email: z.string({
        required_error: "Email is required",
    }).email({ message: "Invalid email address" }),

    phoneNumber: z.string({
        required_error: "Phone Number is required",
    }).min(11, { message: "Phone Number must be at least 11 characters" }),
    role: z
        .string({ required_error: "Role is required" })
        .refine((val) => val === "landlord" || val === "tenant", {
            message: "Role must be either landlord or tenant",
        }),

    password: z
        .string()
        .min(8, "Password must be at least 6 characters")
        .regex(/[A-Z]/, "Must contain at least one uppercase letter")
        .regex(/[0-9]/, "Must contain at least one number")
        .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),

    confirmPassword: z.string({
        required_error: "Confirm Password is required",
    }),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});
