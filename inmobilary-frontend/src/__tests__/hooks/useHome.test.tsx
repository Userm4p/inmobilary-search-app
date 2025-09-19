import { renderHook, act } from '@testing-library/react';
import { useHome } from '@/hooks/useHome';
import { PropertyService } from '@/api/helpers/property.service';

// Mock the PropertyService
jest.mock('@/api/helpers/property.service', () => ({
  PropertyService: jest.fn().mockImplementation(() => ({
    getAllProperties: jest.fn(),
  })),
}));

jest.mock('@/api/axios', () => ({
  instance: {},
}));

const mockProperties = [
  {
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
  },
];

// Mock the PropertyService instance
const mockGetAllProperties = jest.fn();

describe('useHome', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetAllProperties.mockClear();

    // Mock the PropertyService constructor
    (PropertyService as jest.Mock).mockImplementation(() => ({
      getAllProperties: mockGetAllProperties,
    }));
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useHome());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.properties).toEqual([]);
    expect(result.current.searchFilters).toEqual({
      address: '',
      maxPrice: '',
      minPrice: '',
      name: '',
    });
  });

  it('should handle input change for text fields', () => {
    const { result } = renderHook(() => useHome());

    act(() => {
      result.current.handleInputChange({
        target: { name: 'name', value: 'Test Property' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.searchFilters.name).toBe('Test Property');
  });

  it('should handle input change for price fields', () => {
    const { result } = renderHook(() => useHome());

    act(() => {
      result.current.handleInputChange({
        target: { name: 'minPrice', value: '100000' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.searchFilters.minPrice).toBe(100000);
  });

  it('should handle empty price input', () => {
    const { result } = renderHook(() => useHome());

    act(() => {
      result.current.handleInputChange({
        target: { name: 'minPrice', value: '' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.searchFilters.minPrice).toBe(undefined);
  });

  it('should get properties successfully', async () => {
    mockGetAllProperties.mockResolvedValue(mockProperties);

    const { result } = renderHook(() => useHome());

    await act(async () => {
      await result.current.getProperties();
    });

    expect(result.current.properties).toEqual(mockProperties);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('should handle get properties error', async () => {
    mockGetAllProperties.mockRejectedValue(new Error('API Error'));

    const { result } = renderHook(() => useHome());

    await act(async () => {
      await result.current.getProperties();
    });

    expect(result.current.properties).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe('Failed to fetch properties');
  });

  it('should clear filters', async () => {
    mockGetAllProperties.mockResolvedValue(mockProperties);

    const { result } = renderHook(() => useHome());

    // Set some filters first
    act(() => {
      result.current.handleInputChange({
        target: { name: 'name', value: 'Test' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    // Clear filters
    await act(async () => {
      result.current.handleClearFilters();
    });

    expect(result.current.searchFilters).toEqual({
      address: '',
      maxPrice: undefined,
      minPrice: undefined,
      name: '',
    });
    expect(mockGetAllProperties).toHaveBeenCalledWith({});
  });

  it('should get properties with custom filters', async () => {
    mockGetAllProperties.mockResolvedValue(mockProperties);

    const { result } = renderHook(() => useHome());

    const customFilters = { name: 'Custom Property' };

    await act(async () => {
      await result.current.getProperties(customFilters);
    });

    expect(mockGetAllProperties).toHaveBeenCalledWith(customFilters);
  });
});
