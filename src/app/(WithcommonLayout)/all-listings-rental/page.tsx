"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import homeImg from "@/app/assets/images/home3.jpg";
import { getAllPublicRentalHouses } from "@/services/ListingService";
import { Input } from "@/components/ui/input";
import { TRentalHouse } from "@/types";
import NLButton from "@/components/ui/core/ImageUploader/NLButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FaThList } from "react-icons/fa";
import { IoGrid } from "react-icons/io5";
import SingleCard from "@/components/modules/rentalHouse/rentalHouseCard/SingleCard";
import SingleCardListView from "@/components/modules/rentalHouse/rentalHouseCard/SingleCardListView";

const RentalHouseSearchableFields = [
  "location",
  "description",
  "rentAmount",
  "bedrooms",
  "bathrooms",
  "size",
  "availableFrom",
  "contactInfo",
];

const AllListingsRental = () => {
  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState("location");
  const [sortBy, setSortBy] = useState("location");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [limit, setLimit] = useState(6);
  const [page, setPage] = useState(1);
  const [rentalHouses, setRentalHouses] = useState<TRentalHouse[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [allAmenitiesList, setAllAmenitiesList] = useState<string[]>([]);
  const [isGrid, setIsGrid] = useState(true);

  const [minRent, setMinRent] = useState("");
  const [maxRent, setMaxRent] = useState("");

  const fetchListings = async () => {
    setLoading(true);
    const filters: { key: string; value: string }[] = [];
    const res = await getAllPublicRentalHouses(filters);
    setRentalHouses(res?.data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchListings();
  }, []);

  // Filter, search, sort, and paginate
  const filteredData = useMemo(() => {
    let data = [...rentalHouses];

    // Search
    if (search && searchField) {
      data = data.filter((item: any) =>
        String(item[searchField])?.toLowerCase()?.includes(search.toLowerCase())
      );
    }

    // Rent range
    if (minRent !== "" || maxRent !== "") {
      data = data.filter((item: TRentalHouse) => {
        const rent = Number(item?.rentAmount);
        const min = minRent !== "" ? Number(minRent) : -Infinity;
        const max = maxRent !== "" ? Number(maxRent) : Infinity;
        return rent >= min && rent <= max;
      });
    }

    // Amenities
    if (selectedAmenities.length > 0) {
      data = data.filter((item: TRentalHouse) =>
        selectedAmenities.every((amenity) => item?.amenities?.includes(amenity))
      );
    }

    // Sort
    data.sort((a: any, b: any) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];
      if (aVal === undefined || bVal === undefined) return 0;

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
      }

      return sortOrder === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });

    return data;
  }, [
    rentalHouses,
    search,
    searchField,
    sortBy,
    sortOrder,
    minRent,
    maxRent,
    selectedAmenities,
  ]);

  // Paginate
  const paginatedData = useMemo(() => {
    const start = (page - 1) * limit;
    return filteredData.slice(start, start + limit);
  }, [filteredData, page, limit]);

  const totalPages = Math.ceil(filteredData.length / limit);

  const handleClearFilters = () => {
    setSearch("");
    setSearchField("location");
    setSortBy("location");
    setSortOrder("asc");
    setMinRent("");
    setMaxRent("");
    setLimit(6);
    setPage(1);
    setSelectedAmenities([]);
  };

  const handleCheckboxChange = (amenity: any) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
    setPage(1);
  };

  useEffect(() => {
    const allAmenities = Array.from(
      new Set(rentalHouses.flatMap((house) => house.amenities))
    );
    setAllAmenitiesList(allAmenities);
  }, [rentalHouses]);

  return (
    <div>
      {/* Hero Banner */}
      <div className="relative w-full h-[40vh]">
        <Image src={homeImg} fill alt="Home" className="object-cover z-0" />
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="absolute left-1/2 top-[50%] -translate-x-1/2 -translate-y-1/2 z-20 text-center">
          <p className="text-white text-lg">The ultimate luxury</p>
          <h1 className="text-3xl md:text-5xl text-white font-bold">
            Explore Houses for Rent Near You
          </h1>
          <div className="text-white mt-5 flex justify-center items-center gap-2 text-sm lg:text-xl">
            <Link href="/">Home</Link>
            <span>/</span>
            <span className="text-gray-300">All Listing Rental</span>
          </div>
        </div>
      </div>

      {/* Filters & Listings */}
      <div className="container mx-auto px-3 my-10 md:my-20">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Filters */}
          <div className="space-y-4">
            {/* Search Input */}
            <div>
              <h2 className="font-semibold text-xl border-b-2 border-gray-200 pb-2 mb-5">
                Search by keyword
              </h2>
              <Input
                placeholder="Write a keyword"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
            </div>

            {/* Rent Range */}
            <div>
              <h2 className="font-semibold text-xl border-b-2 border-gray-200 pb-2 mb-5">
                Rent Range
              </h2>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={minRent}
                  onChange={(e) => {
                    setMinRent(e.target.value);
                    setPage(1);
                  }}
                />
                <Input
                  type="number"
                  placeholder="Max"
                  value={maxRent}
                  onChange={(e) => {
                    setMaxRent(e.target.value);
                    setPage(1);
                  }}
                />
              </div>
            </div>

            {/* Sort By */}
            <div>
              <h2 className="font-semibold text-xl border-b-2 border-gray-200 pb-2 mb-5">
                Sort By
              </h2>
              {/* Sort By Dropdown */}
              <Select
                value={sortBy}
                onValueChange={(value) => {
                  setSortBy(value);
                  setPage(1);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  {RentalHouseSearchableFields.map((field) => (
                    <SelectItem key={field} value={field}>
                      {field}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort Order Dropdown */}
              <Select
                value={sortOrder}
                onValueChange={(value) => {
                  setSortOrder(value as "asc" | "desc");
                  setPage(1);
                }}
              >
                <SelectTrigger className="w-full mt-2">
                  <SelectValue placeholder="Sort Order" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asc">Ascending</SelectItem>
                  <SelectItem value="desc">Descending</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Limit */}
            <div>
              <h2 className="font-semibold text-xl border-b-2 border-gray-200 pb-2 mb-5">
                Limit per page
              </h2>
              <Select
                value={String(limit)}
                onValueChange={(value) => {
                  setLimit(Number(value));
                  setPage(1);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select limit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="6">6</SelectItem>
                  <SelectItem value="9">9</SelectItem>
                  <SelectItem value="12">12</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="font-semibold text-xl border-b-2 border-gray-200 pb-2 mb-5">
                Amenities
              </h2>

              {allAmenitiesList?.map((amenity) => (
                <label
                  key={amenity}
                  className="flex items-center gap-2 cursor-pointer select-none"
                >
                  <input
                    type="checkbox"
                    checked={selectedAmenities.includes(amenity)}
                    onChange={() => handleCheckboxChange(amenity)}
                    className="peer hidden"
                  />
                  <div className="w-4 h-4 rounded border border-gray-400 peer-checked:bg-[#62a812] peer-checked:border-[#62a812] flex items-center justify-center transition-colors duration-200">
                    {selectedAmenities.includes(amenity) && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm">{amenity}</span>
                </label>
              ))}
            </div>
            {/* Clear Filters */}
            <div>
              <NLButton
                variant="outline"
                onClick={handleClearFilters}
                className="w-full font-bold border-gray-400 text-gray-400 !py-1"
              >
                Clear All Filters
              </NLButton>
            </div>
          </div>

          {/* Listings */}
          <div className="col-span-1 md:col-span-4">
            {loading ? (
              <p>Loading listings...</p>
            ) : (
              // <AllListingsRentalHouse rentalHouses={paginatedData} />

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
                        {paginatedData?.map((info) => (
                          <SingleCard key={info._id} info={info} />
                        ))}
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
                        {paginatedData?.map((info) => (
                          <SingleCardListView key={info._id} info={info} />
                        ))}
                      </div>
                    )}
                  </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-6 space-x-2 flex-wrap">
                <NLButton
                  variant="outline"
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  disabled={page === 1}
                >
                  Previous
                </NLButton>
                {Array.from({ length: totalPages }, (_, i) => (
                  <NLButton
                    key={i}
                    onClick={() => setPage(i + 1)}
                    variant={page === i + 1 ? "primary" : "outline"}
                  >
                    {i + 1}
                  </NLButton>
                ))}
                <NLButton
                  variant="outline"
                  onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                  disabled={page === totalPages}
                >
                  Next
                </NLButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllListingsRental;
