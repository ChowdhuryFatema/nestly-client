export type TRentalHouse = {
  length: number;
  _id: string;
  location: string;
  description: string;
  rentAmount: number;
  status: string;
  images: string[];
  bedrooms: number;
  amenities: string[];
};

export type TRentalRequest = {
  moveInDate: string;
  rentalDuration: string;
  message: string;
};
