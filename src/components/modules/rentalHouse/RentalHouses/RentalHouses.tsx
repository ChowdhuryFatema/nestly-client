"use client";

import React, { useEffect, useMemo, useState } from "react";
import { TRentalHouse } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FaList } from "react-icons/fa";
import { LuLayoutGrid } from "react-icons/lu";
import SingleCard from "@/components/modules/rentalHouse/rentalHouseCard/SingleCard";
import SingleCardListView from "@/components/modules/rentalHouse/rentalHouseCard/SingleCardListView";
import RentalCardSkeleton from "../rentalHouseCard/RentalCardSkeleton";


const RentalHouses = ({ rentalHouses }: { rentalHouses: TRentalHouse[] }) => {
  const [limit, setLimit] = useState(6);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isGrid, setIsGrid] = useState(true);


  // Paginate
  const paginatedData = useMemo(() => {
    const start = (page - 1) * limit;
    return rentalHouses.slice(start, start + limit);
  }, [rentalHouses, page, limit]);


  useEffect(() => {
    if (rentalHouses.length === 0) {
      setLoading(true);
    }
  }, [rentalHouses]);

  return (
    <div>
      {/* Filters & Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <div>
          <h2 className="text-2xl font-bold">Your Next Favorite House Awaits</h2>
          <p className="text-gray-500">
            Showing approx 6 available listings for you...
          </p>
        </div>
        <div className="flex justify-end gap-4">
          <div className="flex items-center gap-2">
            <h2 className="!text-sm">Show:</h2>
            <div>
              <Select
                value={String(limit)}
                onValueChange={(value) => {
                  setLimit(Number(value));
                  setPage(1);
                }}
              >
                <SelectTrigger className="w-[80px] !h-[28px] rounded">
                  <SelectValue placeholder="Select limit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="4">3</SelectItem>
                  <SelectItem value="8">6</SelectItem>
                  <SelectItem value="12">9</SelectItem>
                  <SelectItem value="24">12</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <h2 className="!text-sm">View:</h2>
            <Button
              className="bg-transparent text-gray-700 hover:bg-transparent !p-0 cursor-pointer"
              onClick={() => setIsGrid(true)}
            >
              <LuLayoutGrid size={24} />
            </Button>
            <Button
              className="bg-transparent text-gray-700 hover:bg-transparent !p-0 cursor-pointer"
              onClick={() => setIsGrid(false)}
            >
              <FaList size={24} />
            </Button>
          </div>
        </div>
      </div>
      {/* Listings */}
      <div>
        {loading ? (
          <RentalCardSkeleton />
        ) : (
          <div>
            {isGrid ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedData?.map((info) => (
                  <SingleCard key={info._id} info={info} />
                ))}
              </div>
            ) : (
              <div>
                {paginatedData?.map((info) => (
                  <SingleCardListView key={info._id} info={info} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RentalHouses;
