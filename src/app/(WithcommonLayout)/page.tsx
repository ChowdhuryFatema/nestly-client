"use client";

import Banner from "@/components/modules/banner/Banner";
import Cards from "@/components/modules/rentalHouse/rentalHouseCard/Cards";
import RentingTips from "@/components/modules/Testimonial/RentingTips";
import Testimonial from "@/components/modules/Testimonial/Testimonial";
import { useUser } from "@/context/UserContext";
import React from "react";

const HomePage = () => {
  const user = useUser();
  console.log("user", user);

  return (
    <div>
      <Banner />
      <div className="container mx-auto px-3 my-10 lg:my-20">
        <Cards />
        <Testimonial/>
        <RentingTips/>
      </div>
    </div>
  );
};

export default HomePage;
