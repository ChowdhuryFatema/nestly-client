import React from "react";
import homeImg from "@/app/assets/images/home3.jpg";
import Image from "next/image";
import Link from "next/link";
import homeData from "@/data.json";
import RentalHouseDetailsCard from "@/components/modules/auth/rentalHouseDetailsCard/RentalHouseDetailsCard";

const RentalHouseDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const singleData = homeData?.find((data) => data?.id === Number(id));

  return (
    <div>
      <div className="relative w-full h-[40vh]">
        {/* Background Image */}
        <Image src={homeImg} fill alt="Home" className="object-cover z-0" />

        {/* Black Overlay */}
        <div className="absolute inset-0 bg-black/60 z-10" />

        {/* Logo and content */}
        <div className="absolute left-1/2 top-[50%] -translate-x-[50%] -translate-y-[50%] z-20 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-black flex items-center justify-center text-white">
              Explore Rental Details
            </h1>
            <div className="flex items-center space-x-2 text-white justify-center">
              <Link href="/">Home</Link>
              <span>/</span>
              <span className="text-gray-300">Details</span>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-3 my-10 md:my-20">
        <RentalHouseDetailsCard singleData={singleData!} />
      </div>
    </div>
  );
};

export default RentalHouseDetails;
