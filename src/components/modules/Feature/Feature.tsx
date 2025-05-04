import Image from "next/image";
import home1 from "@/app/assets/images/home6.jpg";
import home2 from "@/app/assets/images/home7.webp";

const Feature = () => {
  return (
    <section className="dark:bg-gray-100 dark:text-gray-800">
      <div className="space-y-10">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-center dark:text-gray-900">
            What Makes Us Stand Out
          </h2>
          <p className="max-w-3xl mx-auto mt-4 text-sm text-center dark:text-gray-600">
            Discover flexible rental options, modern amenities, and hassle-free
            living experiences designed just for you.
          </p>
        </div>

        <div className="grid lg:gap-8 lg:grid-cols-2 lg:items-center">
          <div className="order-2 lg:order-1">
            <h3 className="text-xl font-bold tracking-tight sm:text-3xl dark:text-gray-900">
              Why Choose Our Rental Homes?
            </h3>
            <p className="mt-3 text-lg dark:text-gray-600">
              Whether you&apos;re looking for a cozy apartment or a spacious
              family house, we provide properties to fit every lifestyle and
              budget.
            </p>
            <div className="mt-4 space-y-3">
              {/* Feature 1 */}
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-md dark:bg-violet-600 dark:text-gray-50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-7 h-7"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium leading-6 dark:text-gray-900">
                    Fully Furnished Options
                  </h4>
                  <p className="mt-2 dark:text-gray-600">
                    Move in with ease! Select properties come fully furnished
                    with stylish interiors and essential appliances.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-md dark:bg-violet-600 dark:text-gray-50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-7 h-7"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium leading-6 dark:text-gray-900">
                    Flexible Lease Terms
                  </h4>
                  <p className="mt-2 dark:text-gray-600">
                    Choose the lease duration that fits your needs — short-term
                    stays or long-term contracts are available.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-md dark:bg-violet-600 dark:text-gray-50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-7 h-7"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium leading-6 dark:text-gray-900">
                    Prime Locations
                  </h4>
                  <p className="mt-2 dark:text-gray-600">
                    Live close to shopping centers, public transport, schools,
                    and parks — making your everyday life convenient.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Rental Image */}
          <div className="overflow-hidden order-1 lg:order-2">
            <Image
              src={home1}
              alt="Rental house"
              width={760}
              height={680}
              className="transition-transform duration-500 hover:scale-110 shadow-lg mb-5"
            />
          </div>
        </div>

        {/* Second Section */}

        <div className="grid lg:gap-8 lg:grid-cols-2 lg:items-center mt-10">
          {/* Rental Image */}
          <div className="overflow-hidden">
            <Image
              src={home2}
              alt="Rental house"
              width={760}
              height={680}
              className="transition-transform duration-500 hover:scale-110 shadow-lg mb-5"
            />
          </div>

          <div className="">
            <h3 className="text-xl font-bold tracking-tight sm:text-3xl dark:text-gray-900">
              Experience Comfort Like Never Before
            </h3>
            <p className="mt-3 text-lg dark:text-gray-600">
              Our rentals are designed with modern living in mind — offering
              both luxury and affordability, all in one place.
            </p>
            <div className="mt-4 space-y-3">
              {/* Feature 4 */}
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-md dark:bg-violet-600 dark:text-gray-50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-7 h-7"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium leading-6 dark:text-gray-900">
                    24/7 Maintenance Support
                  </h4>
                  <p className="mt-2 dark:text-gray-600">
                    Our dedicated support team is ready to assist you anytime,
                    ensuring a worry-free rental experience.
                  </p>
                </div>
              </div>

              {/* Feature 5 */}
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-md dark:bg-violet-600 dark:text-gray-50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-7 h-7"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium leading-6 dark:text-gray-900">
                    Pet-Friendly Homes
                  </h4>
                  <p className="mt-2 dark:text-gray-600">
                    Bring your furry friends along! Many of our rental homes
                    welcome pets with open arms.
                  </p>
                </div>
              </div>

              {/* Feature 6 */}
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-md dark:bg-violet-600 dark:text-gray-50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-7 h-7"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium leading-6 dark:text-gray-900">
                    Energy-Efficient Designs
                  </h4>
                  <p className="mt-2 dark:text-gray-600">
                    Save on utility bills with our eco-friendly homes featuring
                    modern insulation and energy-efficient appliances.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature;
