import { Property, SearchFilters } from './Property.types';

export interface IHomeContext {
  isLoading: boolean;
  error: string | null;
  properties: Property[];
  getProperties: () => Promise<void>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchFilters: SearchFilters;
}
