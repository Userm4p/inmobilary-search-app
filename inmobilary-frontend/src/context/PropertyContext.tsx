import { IPropertyContext } from '@/types/Property.types';
import { createContext } from 'react';

const initialState: IPropertyContext = {
  getProperty: async () => {},
  isLoading: false,
  error: null,
  property: null,
};

export const PropertyContext = createContext<IPropertyContext>(initialState);
