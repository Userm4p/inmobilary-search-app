'use client';
import { PropertyContextLayout } from '@/components/Property/components/PropertyContextLayout/PropertyContextLayout';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

const layout = ({ children }: Props) => {
  return (
    <>
      <PropertyContextLayout>{children}</PropertyContextLayout>
    </>
  );
};

export default layout;
