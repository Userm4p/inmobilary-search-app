'use client';
import { IHomeContext } from '@/types/Home.types';
import { createContext } from 'react';

const homeContextInitialValues: IHomeContext = {
  isLoading: false,
  error: null,
  properties: [],
  getProperties: async () => {},
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
  },
  searchFilters: {},
  handleClearFilters: () => {},
};

export const HomeContext = createContext<IHomeContext>(homeContextInitialValues);
