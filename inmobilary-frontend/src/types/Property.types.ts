export interface Property {
  id: string;
  ownerId: string;
  owner: Owner;
  name: string;
  address: string;
  price: number;
  images: string[];
  traces: Trace[];
}

export interface Owner {
  id: string;
  name: string;
  address: string;
  photo: string;
  birthday: string;
}

export interface Trace {
  id: string;
  dateScale: string;
  name: string;
  value: number;
  tax: number;
  propertyId: string;
}

export interface SearchFilters {
  name?: string;
  address?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface IPropertyContext {
  isLoading: boolean;
  error: string | null;
  property: Property | null;
  getProperty: () => Promise<void>;
}
