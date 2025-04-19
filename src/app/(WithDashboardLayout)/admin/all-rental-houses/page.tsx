import ManageRentalHouse from '@/components/modules/manageRentalHouse/ManageRentalHouse';
import { getAllAdminRentalHouses } from '@/services/ManageRentalHouse';
import React from 'react';

const AllRentalHouses = async() => {

    const allRentalHouses = await getAllAdminRentalHouses();

    return (
        <div>
          <ManageRentalHouse allRentalHouses={allRentalHouses?.data} />
        </div>
    );
};

export default AllRentalHouses;