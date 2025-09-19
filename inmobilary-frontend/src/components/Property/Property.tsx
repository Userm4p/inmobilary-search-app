'use client';
import React, { useContext, useEffect } from 'react';
import { Header } from './components/Header/Header';
import { PropertyContext } from '@/context/PropertyContext';
import { PropertyImgCarousel } from './components/PropertyImgCarousel/PropertyImgCarousel';
import { InformationCard } from './components/InformationCard/InformationCard';
import Loader from '../Loader/Loader';

const Property = () => {
  const { getProperty, property, isLoading, error } = useContext(PropertyContext);

  useEffect(() => {
    getProperty();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-red-500 text-2xl font-bold">{error}</h1>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="flex lg:items-start items-center lg:flex-row flex-col justify-center lg:gap-8 gap-10 mt-4 p-4">
        <div className="flex flex-col justify-center items-center">
          <PropertyImgCarousel />
          <h1 className="text-white text-3xl font-bold bg-gray-900 bg-opacity-50 mt-8 p-4 md:w-[604px] sm:w-[504px] xs:w-[360px] xxs:w-[350px] w-[300px] rounded-lg">
            {property?.name}
          </h1>
        </div>
        <InformationCard />
      </div>
    </div>
  );
};

export default Property;
