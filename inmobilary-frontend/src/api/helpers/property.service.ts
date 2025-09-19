import { Property, SearchFilters } from '@/types/Property.types';
import { AxiosInstance } from 'axios';

const path = '/properties';

export class PropertyService {
  private instance: AxiosInstance;

  constructor(instance: AxiosInstance) {
    this.instance = instance;
  }

  getAllProperties = async (searchFilters: SearchFilters) => {
    const filteredParams = Object.fromEntries(
      Object.entries(searchFilters).filter(([_, value]) => value !== undefined && value !== '')
    );

    const response = await this.instance.get<Property[]>(path, { params: filteredParams });
    return response.data;
  };

  getPropertyById = async (id: string) => {
    const response = await this.instance.get<Property>(path + '/' + id);
    return response.data;
  };
}
