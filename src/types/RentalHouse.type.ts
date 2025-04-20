export type TRentalHouse = {
  _id: string;
  location: string;
  rentAmount: string;
  bedrooms: string;
  description: string;
  images: string[];
  amenities: string[];
  status: string;
};

export type TRentalRequest = {
  moveInDate: string;
  rentalDuration: string;
  message: string;
};
