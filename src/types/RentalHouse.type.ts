import { TUser } from "./user.type";


export type TRentalHouse = {
  _id?: string;
  landlord?: string;
  location: string;
  rentAmount: number | undefined;
  bedrooms: number | undefined;
  description: string;
  images: string[];
  amenities: string[];
  status?: string;
};

export type TRentalRequest = {
  rentalHouseId: TRentalHouse;
  tenantId?: TUser;
  paymentStatus?: string;
  landlordId?: string;
  _id: string;
  rentAmount?: number | undefined;
  moveInDate: string;
  rentalDuration: string;
  message: string;
  status?: string;
};


