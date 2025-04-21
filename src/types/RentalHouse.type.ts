import { TUser } from "./user.type";

export type TRentalHouse = {
  _id?: string;
  landlord?: string;

  location: string;
  rentAmount: string;
  bedrooms: string;
  description: string;
  images: string[];
  amenities: string[];
  status: string;
};

export type TRentalRequest = {
  rentalHouseId?: string;
  tenantId?: TUser;
  paymentStatus?: string;
  landlordId?: { _id: string };
  _id: string;
  moveInDate: string;
  rentalDuration: string;
  message: string;
  status: string;
};
