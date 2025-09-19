import { instance } from '@/api/axios';
import { PropertyService } from '@/api/helpers/property.service';
import { IPropertyContext, Property } from '@/types/Property.types';
import React, { useCallback, useMemo, useState } from 'react';

export const useProperty = (id: string): IPropertyContext => {
  const [property, setProperty] = useState<Property>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const propertyService = useMemo(() => new PropertyService(instance), []);

  const getProperty = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await propertyService.getPropertyById(id);
      setProperty(data);
      setError(null);
    } catch (error) {
      setError('Failed to fetch properties');
    } finally {
      setIsLoading(false);
    }
  }, [propertyService]);

  return {
    getProperty,
    property: property!,
    isLoading,
    error,
  };
};
