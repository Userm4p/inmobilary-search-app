import { renderHook, act } from '@testing-library/react';
import { useProperty } from '@/hooks/useProperty';
import { PropertyService } from '@/api/helpers/property.service';

// Mock the PropertyService
jest.mock('@/api/helpers/property.service', () => ({
  PropertyService: jest.fn().mockImplementation(() => ({
    getPropertyById: jest.fn(),
  })),
}));

jest.mock('@/api/axios', () => ({
  instance: {},
}));

// Mock the PropertyService instance
const mockGetPropertyById = jest.fn();

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

describe('useProperty', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetPropertyById.mockClear();

    // Mock the PropertyService constructor
    (PropertyService as jest.Mock).mockImplementation(() => ({
      getPropertyById: mockGetPropertyById,
    }));
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useProperty('1'));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.property).toBe(null);
  });

  it('should get property successfully', async () => {
    mockGetPropertyById.mockResolvedValue(mockProperty);

    const { result } = renderHook(() => useProperty('1'));

    await act(async () => {
      await result.current.getProperty();
    });

    expect(result.current.property).toEqual(mockProperty);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('should handle get property error', async () => {
    mockGetPropertyById.mockRejectedValue(new Error('API Error'));

    const { result } = renderHook(() => useProperty('1'));

    await act(async () => {
      await result.current.getProperty();
    });

    expect(result.current.property).toBe(null);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe('Failed to fetch property');
  });

  it('should set loading state during API call', async () => {
    let resolvePromise: (value: any) => void;
    const promise = new Promise(resolve => {
      resolvePromise = resolve;
    });
    mockGetPropertyById.mockReturnValue(promise);

    const { result } = renderHook(() => useProperty('1'));

    act(() => {
      result.current.getProperty();
    });

    expect(result.current.isLoading).toBe(true);

    await act(async () => {
      resolvePromise!(mockProperty);
    });

    expect(result.current.isLoading).toBe(false);
  });

  it('should clear error on successful request', async () => {
    // First set an error
    mockGetPropertyById.mockRejectedValueOnce(new Error('First Error'));
    const { result } = renderHook(() => useProperty('1'));

    await act(async () => {
      await result.current.getProperty();
    });

    expect(result.current.error).toBe('Failed to fetch property');

    // Then make a successful request
    mockGetPropertyById.mockResolvedValue(mockProperty);

    await act(async () => {
      await result.current.getProperty();
    });

    expect(result.current.error).toBe(null);
  });
});
