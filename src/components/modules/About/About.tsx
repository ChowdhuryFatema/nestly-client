"use client";

import Image from "next/image";
import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-12 text-center">
      {/* Mission Statement */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-primary-600 mb-4">Our Mission</h2>
        <p className="text-gray-700 text-base leading-relaxed">
          BasaFinder is dedicated to making the process of finding rental homes easier, faster, and more secure. Our vision is to bridge the gap between landlords and tenants through a user-friendly digital platform that promotes transparency and trust.
        </p>
      </section>

      {/* Team Information */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-primary-600 mb-6">Meet the Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Team Member 1 */}
          <div className="flex flex-col items-center text-center">
            <Image
              src="https://i.pinimg.com/736x/df/46/fa/df46facd49362d3965872a3d643e095b.jpg"
              alt="Mohammad Salim"
              width={96}
              height={96}
              className="w-24 h-24 rounded-full object-cover mb-4"
            />
            <h3 className="text-xl font-semibold text-primary-500">Mohammad Salim</h3>
            <p className="text-gray-700 mt-2 text-sm">
              Full Stack Developer and project manager. Passionate about building efficient digital experiences.
            </p>
          </div>

          {/* Team Member 2 */}
          <div className="flex flex-col items-center text-center">
            <Image
              src="https://i.pinimg.com/736x/ca/cb/19/cacb196590d8f40c55d825902e8ab733.jpg"
              alt="Saiful Islam"
              width={96}
              height={96}
              className="w-24 h-24 rounded-full object-cover mb-4"
            />
            <h3 className="text-xl font-semibold text-primary-500">Saiful Islam</h3>
            <p className="text-gray-700 mt-2 text-sm">
              Frontend Developer focused on elegant UI and interactive user experience.
            </p>
          </div>

          {/* Team Member 3 */}
          <div className="flex flex-col items-center text-center">
            <Image
              src="https://i.pinimg.com/736x/91/cc/a8/91cca8839fde6b8be674779d22e51f79.jpg"
              alt="Naiem Joy"
              width={96}
              height={96}
              className="w-24 h-24 rounded-full object-cover mb-4"
            />
            <h3 className="text-xl font-semibold text-primary-500">Mosharraf Hossain</h3>
            <p className="text-gray-700 mt-2 text-sm">
              Backend Developer and deployment expert, ensuring smooth API integration and performance.
            </p>
          </div>

          {/* Team Member 4 */}
          <div className="flex flex-col items-center text-center">
            <Image
              src="https://i.pinimg.com/736x/57/c1/4e/57c14e92d7a89b3e805df7f1ba077997.jpg"
              alt="Fatema Choudhury"
              width={96}
              height={96}
              className="w-24 h-24 rounded-full object-cover mb-4"
            />
            <h3 className="text-xl font-semibold text-primary-500">Fatema Choudhury</h3>
            <p className="text-gray-700 mt-2 text-sm">
              Project Leader and strategist, overseeing product development and team collaboration.
            </p>
          </div>
        </div>
      </section>

     {/* Contact Information */}
<section className="bg-gradient-to-br from-gray-50 to-green-50 py-10 px-4 rounded-xl shadow-md max-w-3xl mx-auto mt-10">
  <h2 className="text-4xl font-bold text-center text-primary-600 mb-6">Contact Us</h2>
  <ul className="text-gray-700 text-lg space-y-4 text-center">
    <li>
      <span className="font-semibold">Email:</span>{" "}
      <a
        href="mailto:contact@basafinder.com"
        className="text-primary-500 hover:underline"
      >
        contact@basafinder.com
      </a>
    </li>
    <li>
      <span className="font-semibold">Phone:</span>{" "}
      <a
        href="tel:+8801234567890"
        className="text-primary-500 hover:underline"
      >
        +880 1234 567890
      </a>
    </li>
    <li>
      <div className="flex flex-col items-center gap-3 mt-4">
        <p className="text-lg font-semibold">Follow us on</p>
        <div className="flex justify-center gap-6 text-3xl">
          <a
            href="https://facebook.com/basafinder"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#1877F2] hover:scale-110 transition-transform"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://twitter.com/basafinder"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#1DA1F2] hover:scale-110 transition-transform"
          >
            <FaTwitter />
          </a>
          <a
            href="https://instagram.com/basafinder"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#E1306C] hover:scale-110 transition-transform"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
    </li>
  </ul>
</section>

    </div>
  );
};

export default About;
