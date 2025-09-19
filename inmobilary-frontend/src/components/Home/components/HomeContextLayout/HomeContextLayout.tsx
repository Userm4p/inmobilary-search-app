'use client';
import { HomeContext } from '@/context/HomeContext';
import { useHome } from '@/hooks/useHome';
import React from 'react';

interface Props {
  children?: React.ReactNode;
}

export const HomeContextLayout = ({ children }: Props) => {
  const value = useHome();

  return (
    <>
      <HomeContext.Provider value={value}>{children}</HomeContext.Provider>
    </>
  );
};
