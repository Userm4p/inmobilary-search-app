import { PropertyService } from '@/api/helpers/property.service';
import { AxiosInstance } from 'axios';

const mockAxiosInstance = {
  get: jest.fn(),
} as unknown as AxiosInstance;

const mockProperty = {
  id: '1',
  name: 'Test Property',
  address: '123 Test St',
  price: 100000,
  ownerId: 'owner1',
  owner: {
    id: 'owner1',
    name: 'John Doe',
    address: '456 Owner St',
    photo: 'photo.jpg',
    birthday: '1990-01-01',
  },
  images: ['image1.jpg'],
  traces: [],
};

const mockProperties = [mockProperty];

describe('PropertyService', () => {
  let propertyService: PropertyService;

  beforeEach(() => {
    jest.clearAllMocks();
    propertyService = new PropertyService(mockAxiosInstance);
  });

  describe('getAllProperties', () => {
    it('should get all properties without filters', async () => {
      (mockAxiosInstance.get as jest.Mock).mockResolvedValue({
        data: mockProperties,
      });

      const result = await propertyService.getAllProperties({});

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/properties', {
        params: {},
      });
      expect(result).toEqual(mockProperties);
    });

    it('should get properties with filters', async () => {
      (mockAxiosInstance.get as jest.Mock).mockResolvedValue({
        data: mockProperties,
      });

      const filters = {
        name: 'Test Property',
        minPrice: '100000',
        maxPrice: '200000',
      };

      const result = await propertyService.getAllProperties(filters);

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/properties', {
        params: filters,
      });
      expect(result).toEqual(mockProperties);
    });

    it('should filter out empty values from params', async () => {
      (mockAxiosInstance.get as jest.Mock).mockResolvedValue({
        data: mockProperties,
      });

      const filters = {
        name: 'Test Property',
        address: '',
        minPrice: undefined,
        maxPrice: '200000',
      };

      await propertyService.getAllProperties(filters);

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/properties', {
        params: {
          name: 'Test Property',
          maxPrice: '200000',
        },
      });
    });

    it('should handle API errors', async () => {
      const error = new Error('API Error');
      (mockAxiosInstance.get as jest.Mock).mockRejectedValue(error);

      await expect(propertyService.getAllProperties({})).rejects.toThrow('API Error');
    });
  });

  describe('getPropertyById', () => {
    it('should get property by id', async () => {
      (mockAxiosInstance.get as jest.Mock).mockResolvedValue({
        data: mockProperty,
      });

      const result = await propertyService.getPropertyById('1');

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/properties/1');
      expect(result).toEqual(mockProperty);
    });

    it('should handle API errors when getting property by id', async () => {
      const error = new Error('API Error');
      (mockAxiosInstance.get as jest.Mock).mockRejectedValue(error);

      await expect(propertyService.getPropertyById('1')).rejects.toThrow('API Error');
    });
  });
});
