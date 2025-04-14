export interface IUser {
    userId: string;
    name: string;
    email: string;
    phoneNumber: number;
    role: "tenant" | "landlord" | "admin";
    iat?: number;
    exp?: number;
}