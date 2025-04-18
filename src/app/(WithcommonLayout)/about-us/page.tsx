import Image from "next/image";
import Link from "next/link";
import React from "react";
import homeImg from "@/app/assets/images/home3.jpg";
import About from "@/components/modules/About/About";

const AboutUs = () => {
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
            <p className="text-white text-lg">The ultimate luxury</p>
            <h1 className="text-3xl md:text-4xl lg:text-7xl flex items-center justify-center text-white">
              About Us
            </h1>
            <div className="flex items-center space-x-2 text-white justify-center text-sm lg:text-xl mt-5">
              <Link href="/">Home</Link>
              <span>/</span>
              <span className="text-gray-300">About Us</span>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-3 my-10 md:my-20">
        <About/>
      </div>
    </div>
  );
};

export default AboutUs;
