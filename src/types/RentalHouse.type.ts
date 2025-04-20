import { TUser } from "./user.type";

export type TRentalHouse = {
  _id?: string;
  landlord?: string;
  amenities: string[];

  location: string;
  rentAmount: string;
  bedrooms: string;
  description: string;
  images: string[];
};

export type TRentalRequest = {
  rentalHouseId?: TRentalHouse;
  tenantId?: TUser;
  paymentStatus?: string;
  landlordId?: { _id: string };
  _id: string;
  moveInDate: string;
  rentalDuration: string;
  message: string;
  status: string;
};
