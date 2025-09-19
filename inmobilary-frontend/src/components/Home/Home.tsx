'use client';
import React, { useContext, useEffect } from 'react';
import { Header } from './components/Header/Header';
import { RealEStateCard } from './components/RealEStateCard/RealEStateCard';
import { HomeContext } from '@/context/HomeContext';
import { Loader } from 'lucide-react';

const Home = () => {
  const { getProperties, properties, isLoading } = useContext(HomeContext);

  useEffect(() => {
    getProperties();
  }, []);

  return (
    <div>
      <Header />
      <div className="w-[100%] flex justify-center align-center flex-wrap gap-8 items-center mt-4">
        {isLoading && (
          <div className="flex justify-center items-center py-4 w-full">
            <Loader className="w-10 h-10 text-white animate-spin" />
            <span className="ml-2 text-sm text-white">Loading</span>
          </div>
        )}
        {properties.map(property => (
          <RealEStateCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default Home;
