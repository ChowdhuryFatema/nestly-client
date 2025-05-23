"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { TRentalHouse } from "@/types/RentalHouse.type";
import { getRentalHouseById } from "@/services/ListingService";
import UpdateRentalForm from "@/components/modules/rentalHouse/rentalForm/updateRentalForm";

export default function UpdateRental() {
  const { id } = useParams();
  const [rentalHouse, setRentalHouse] = useState<TRentalHouse | null>(null);

  useEffect(() => {
    const fetchRentalHouse = async () => {
      const res = await getRentalHouseById(id as string);
      setRentalHouse(res.data);
    };
    fetchRentalHouse();
  }, [id]);

  return <UpdateRentalForm rentalHouse={rentalHouse as TRentalHouse} />;
}

