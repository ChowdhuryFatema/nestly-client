import Banner from "@/components/modules/banner/Banner";
import RentalHouses from "@/components/modules/rentalHouse/RentalHouses/RentalHouses";
import { getAllPublicRentalHouses } from "@/services/ListingService";

const HomePage = async () => {
  const filters: { key: string; value: string }[] = [];
  const allRentalHouses = await getAllPublicRentalHouses(filters);

  return (
    <div>
      <Banner />
      <div className="container mx-auto px-3 my-10 lg:my-20">
        <RentalHouses rentalHouses={allRentalHouses?.data || []} />
      </div>
    </div>
  );
};

export default HomePage;
