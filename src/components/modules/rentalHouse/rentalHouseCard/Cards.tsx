import React from "react";
import homeInfo from "@/data.json";
import SingleCard from "./SingleCard";
import { TRentalHouse } from "@/types/RentalHouse.type";

const Cards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
      {homeInfo?.map((info) => (
        <SingleCard key={info.rentAmount} info={info as unknown as TRentalHouse} />
      ))}
    </div>
  );
};

export default Cards;
