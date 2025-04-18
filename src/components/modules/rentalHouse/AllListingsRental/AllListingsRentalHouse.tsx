"use client";

import { TRentalHouse } from "@/types";
import SingleCard from "../rentalHouseCard/SingleCard";
import SingleCardListView from "../rentalHouseCard/SingleCardListView";
import { Button } from "@/components/ui/button";
import { FaThList } from "react-icons/fa";
import { IoGrid } from "react-icons/io5";
import { useState } from "react";

type TRentalHousesProps = {
  rentalHouses: TRentalHouse[];
};

const AllListingsRentalHouse = ({ rentalHouses }: TRentalHousesProps) => {
  const [isGrid, setIsGrid] = useState(true);

  console.log("rentalHouses", rentalHouses);

  return (
    <div>
      <div className="flex justify-end">
        <div>
          <Button
            className="bg-transparent text-gray-700 hover:bg-transparent !p-0 cursor-pointer"
            onClick={() => setIsGrid(true)}
          >
            <IoGrid className="!text-7xl" />
          </Button>
          <Button
            className="bg-transparent text-gray-700 hover:bg-transparent !p-0 ml-2 cursor-pointer"
            onClick={() => setIsGrid(false)}
          >
            <FaThList className="!text-7xl" />
          </Button>
        </div>
      </div>
      {isGrid ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {rentalHouses?.map((info) => (
            <SingleCard key={info._id} info={info} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
          {rentalHouses?.map((info) => (
            <SingleCardListView key={info._id} info={info} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllListingsRentalHouse;
