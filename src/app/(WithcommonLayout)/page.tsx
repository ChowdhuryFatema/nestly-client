export const dynamic = 'force-dynamic';
import Banner from "@/components/modules/banner/Banner";
import RentingTips from "@/components/modules/Testimonial/RentingTips";
import Testimonial from "@/components/modules/Testimonial/Testimonial";
import React from "react";
import RentalHouses from "@/components/modules/rentalHouse/RentalHouses/RentalHouses";
import { getAllPublicRentalHouses } from "@/services/ListingService";
import Service from "@/components/modules/service/Service";
import Feature from "@/components/modules/Feature/Feature";


const HomePage = async () => {
  const filters: { key: string; value: string }[] = [];
  const allRentalHouses = await getAllPublicRentalHouses(filters);

  return (
    <div>
      <Banner />
      <div className="container mx-auto px-3 my-10 lg:my-20">
        <Service />
        <RentalHouses rentalHouses={allRentalHouses?.data || []} />
        <RentingTips />
        <Feature />
        <Testimonial />
      </div>
    </div>
  );
};

export default HomePage;
