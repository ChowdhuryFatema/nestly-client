export type TUser = {
    _id: string;
    name: string;
    email: string;
    password: string;
    role: "tenant" | "landlord" | "admin";
    isActive: boolean; 
    createdAt: string;
    updatedAt: string;
};
