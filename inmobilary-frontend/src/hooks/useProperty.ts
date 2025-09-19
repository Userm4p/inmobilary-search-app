import { instance } from '@/api/axios';
import { PropertyService } from '@/api/helpers/property.service';
import { IPropertyContext, Property } from '@/types/Property.types';
import { useCallback, useMemo, useState } from 'react';

export const useProperty = (id: string): IPropertyContext => {
  const [property, setProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const propertyService = useMemo(() => new PropertyService(instance), []);

  const getProperty = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await propertyService.getPropertyById(id);
      setProperty(data);
      setError(null);
    } catch {
      setError('Failed to fetch property');
    } finally {
      setIsLoading(false);
    }
  }, [propertyService, id]);

  return {
    getProperty,
    property,
    isLoading,
    error,
  };
};
