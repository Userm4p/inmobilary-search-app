'use client';
import React, { useContext, useEffect } from 'react';
import { Header } from './components/Header/Header';
import { PropertyContext } from '@/context/PropertyContext';
import { PropertyImgCarousel } from './components/PropertyImgCarousel/PropertyImgCarousel';
import { InformationCard } from './components/InformationCard/InformationCard';
import { Loader } from 'lucide-react';

const Property = () => {
  const { getProperty, property, isLoading } = useContext(PropertyContext);

  useEffect(() => {
    getProperty();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-4 w-full">
        <Loader className="w-10 h-10 text-white animate-spin" />
        <span className="ml-2 text-sm text-white">Loading</span>
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
