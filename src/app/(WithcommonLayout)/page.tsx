"use client"

import Banner from '@/components/modules/banner/Banner';
import { useUser } from '@/context/UserContext';
import React from 'react';

const HomePage = () => {

  const user = useUser();
  console.log("user", user);

  return (
    <div>
      <Banner />
    </div>
  );
};

export default HomePage;