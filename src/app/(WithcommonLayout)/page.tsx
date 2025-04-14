"use client";

import Banner from "@/components/modules/banner/Banner";
import Cards from "@/components/modules/rentalHouse/rentalHouseCard/Cards";
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
      </div>
    </div>
  );
};

export default HomePage;
