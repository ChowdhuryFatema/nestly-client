import { z } from "zod";

export const rentalSchema = z.object({
    location: z.string({ required_error: "Location is required" }).min(1, { message: "Location is required" }),
    rentAmount: z.string({ required_error: "Rent is required" }).min(1, { message: "Rent is required" }),
    bedrooms: z.string({ required_error: "Number of Bedrooms is required" }).min(1, { message: "Number of Bedrooms is required" }),
    amenities: z.string({ required_error: "Amenities are required" }).min(1, { message: "Amenities are required" }),
    description: z.string({ required_error: "Description is required" }).min(1, { message: "Description is required" }),
})  