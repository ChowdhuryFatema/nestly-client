import homeImage from "@/app/assets/images/home.png";
import Image from "next/image";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const Service = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 mb-14 justify-between items-center">
      <div className="mb-3">
        <Image src={homeImage} width={500} height={600} alt="Home Image" />
      </div>
      <div className="space-y-3">
        <h3 className="text-xl lg:text-2xl font-bold">
          {" "}
          Find Your Perfect Home with Nestly
        </h3>
        <p className="text-gray-600">
          At Nestly, we make finding a rental home easy, reliable, and
          stress-free. Whether you&apos;re looking for a cozy apartment or a
          spacious house, our platform is designed to connect you with your
          ideal living space quickly and securely.
        </p>

        <div>
          <div className="flex gap-2">
            <IoMdCheckmarkCircleOutline
              className="text-primary-500 pt-1"
              size={20}
            />
            <p className="flex gap-2 items-start text-gray-600">
              Wide selection of verified rental properties across prime
              locations
            </p>
          </div>
          <div className="flex gap-2">
            <IoMdCheckmarkCircleOutline
              className="text-primary-500 pt-1"
              size={20}
            />
            <p className="text-gray-600">
              Easy-to-use search filters to match your lifestyle and budget
            </p>
          </div>
          <div className="flex gap-2">
            <IoMdCheckmarkCircleOutline
              className="text-primary-500 pt-1"
              size={20}
            />
            <p className="text-gray-600">
              Direct communication with trusted property owners and managers
            </p>
          </div>
          <div className="flex gap-2">
            <IoMdCheckmarkCircleOutline
              className="text-primary-500 pt-1"
              size={20}
            />
            <p className="text-gray-600">
              {" "}
              Transparent pricing with no hidden charges
            </p>
          </div>
          <div className="flex gap-2">
            <IoMdCheckmarkCircleOutline
              className="text-primary-500 pt-1"
              size={20}
            />
            <p className="text-gray-600">
              {" "}
              24/7 customer support to assist you at every step
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
