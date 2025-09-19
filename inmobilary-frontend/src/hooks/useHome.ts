'use client';
import { instance } from '@/api/axios';
import { PropertyService } from '@/api/helpers/property.service';
import { IHomeContext } from '@/types/Home.types';
import { Property, SearchFilters } from '@/types/Property.types';
import React, { useCallback, useMemo, useState } from 'react';

export const useHome = (): IHomeContext => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    address: '',
    maxPrice: '',
    minPrice: '',
    name: '',
  });

  const propertyService = useMemo(() => new PropertyService(instance), []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setSearchFilters({
      ...searchFilters,
      [name]:
        name === 'minPrice' || name === 'maxPrice'
          ? value === ''
            ? undefined
            : Number(value)
          : value,
    });
  };

  const getProperties = useCallback(
    async (filter?: SearchFilters) => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await propertyService.getAllProperties(filter ? filter : searchFilters);
        setProperties(data);
        setError(null);
      } catch {
        setError('Failed to fetch properties');
      } finally {
        setIsLoading(false);
      }
    },
    [propertyService, searchFilters]
  );

  const handleClearFilters = useCallback(() => {
    setSearchFilters({
      address: '',
      maxPrice: undefined,
      minPrice: undefined,
      name: '',
    });
    getProperties({});
  }, [getProperties]);

  return {
    isLoading,
    error,
    properties,
    getProperties,
    handleInputChange,
    searchFilters,
    handleClearFilters,
  };
};
