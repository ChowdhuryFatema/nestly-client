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
  status?: string;
};

export type TRentalRequest = {
  rentalHouseId: TRentalHouse;
  tenantId?: TUser;
  paymentStatus?: string;
  landlordId?: string;
  _id: string;
  rentAmount?: string;  
  moveInDate: string;
  rentalDuration: string;
  message: string;
  status?: string;
};


