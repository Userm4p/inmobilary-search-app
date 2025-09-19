'use client';
import React, { useContext, useEffect, useMemo } from 'react';
import { Header } from './components/Header/Header';
import { RealEStateCard } from './components/RealEStateCard/RealEStateCard';
import { HomeContext } from '@/context/HomeContext';
import Loader from '../Loader/Loader';
import { NoSearchResultsMessage } from './components/NoSearchResultsMessage/NoSearchResultsMessage';

const Home = () => {
  const { getProperties, properties, isLoading, searchFilters } = useContext(HomeContext);

  useEffect(() => {
    getProperties();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const areFiltersActive = useMemo(() => {
    return Object.values(searchFilters).some(
      value => value !== '' && value !== null && value !== undefined
    );
  }, [searchFilters]);

  const noProperties = useMemo(
    () => properties.length === 0 && !isLoading && !areFiltersActive,
    [properties, isLoading, areFiltersActive]
  );

  const noSearchResults = useMemo(
    () => properties.length === 0 && !isLoading && areFiltersActive,
    [properties, isLoading, areFiltersActive]
  );

  return (
    <div>
      <Header />
      <div className="w-[100%] flex justify-center align-center flex-wrap gap-8 items-center mt-4">
        {isLoading && <Loader />}
        {<NoSearchResultsMessage noProperties={noProperties} noSearchResults={noSearchResults} />}
        {properties.map(property => (
          <RealEStateCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default Home;
