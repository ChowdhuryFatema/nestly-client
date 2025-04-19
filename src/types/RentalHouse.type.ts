export type TRentalHouse = {
  _id?: string;
  landlord?: string;
  amenities: string[];

  location: string;
  rentAmount: string;
  bedrooms: string;
  description: string;
  images: string[];
  amenities: string[];
};

export type TRentalRequest = {
  moveInDate: string;
  rentalDuration: string;
  message: string;
};
