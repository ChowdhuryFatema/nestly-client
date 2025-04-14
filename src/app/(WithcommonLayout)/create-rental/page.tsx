import CreateRentalForm from "@/components/modules/rentalHouse/rentalForm/CreateRentalForm";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import homeImg from "@/app/assets/images/home3.jpg";

const CreateRental = () => {
  return (
    <div>
      <div className="relative w-full h-[30vh] md:h-[40vh]">
        {/* Background Image */}
        <Image src={homeImg} fill alt="Home" className="object-cover z-0" />

        {/* Black Overlay */}
        <div className="absolute inset-0 bg-black/60 z-10" />

        {/* Logo and content */}
        <div className="absolute left-1/2 top-[50%] -translate-x-[50%] -translate-y-[50%] z-20 text-center">
          <div className="space-y-2">
            <p className="text-white text-lg">The ultimate luxury</p>
            <h1 className="text-xl md:text-3xl lg:text-5xl text-white">
              Post Rental House Info
            </h1>
            <div className="flex items-center space-x-2 text-white justify-center text-sm md:text-xl mt-5">
              <Link href="/">Home</Link>
              <span>/</span>
              <span className="text-gray-300">Details</span>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-3 my-10">
        <CreateRentalForm />
      </div>
    </div>
  );
};

export default CreateRental;
