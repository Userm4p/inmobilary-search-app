import { PropertyContext } from '@/context/PropertyContext';
import { useProperty } from '@/hooks/useProperty';
import { useParams } from 'next/navigation';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

export const PropertyContextLayout = ({ children }: Props) => {
  const { id } = useParams();
  const value = useProperty(id as string);

  return (
    <>
      <PropertyContext.Provider value={value}>{children}</PropertyContext.Provider>
    </>
  );
};
