import { Property, SearchFilters } from '@/types/Property.types';
import { AxiosInstance } from 'axios';

const path = '/properties';

export class PropertyService {
  private instance: AxiosInstance;

  constructor(instance: AxiosInstance) {
    this.instance = instance;
  }

  getAllProperties = async (searchFilters: SearchFilters) => {
    try {
      const filteredParams = Object.fromEntries(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        Object.entries(searchFilters).filter(([_, value]) => value !== undefined && value !== '')
      );

      const response = await this.instance.get<Property[]>(path, { params: filteredParams });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  getPropertyById = async (id: string) => {
    try {
      const response = await this.instance.get<Property>(path + '/' + id);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
}
