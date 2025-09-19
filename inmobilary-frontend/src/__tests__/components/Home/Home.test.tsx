import { render, screen, waitFor } from '@testing-library/react';
import Home from '@/components/Home/Home';
import { HomeContext } from '@/context/HomeContext';

const mockProperties = [
  {
    id: '1',
    name: 'Test Property 1',
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
  {
    id: '2',
    name: 'Test Property 2',
    address: '456 Test Ave',
    price: 200000,
    ownerId: 'owner2',
    owner: {
      id: 'owner2',
      name: 'Jane Smith',
      address: '789 Owner Ave',
      photo: 'photo2.jpg',
      birthday: '1985-05-15',
    },
    images: ['image2.jpg'],
    traces: [],
  },
];

// Mock child components
jest.mock('@/components/Home/components/Header/Header', () => ({
  Header: () => <div data-testid="header">Header</div>,
}));

jest.mock('@/components/Home/components/RealEStateCard/RealEStateCard', () => ({
  RealEStateCard: ({ property }: { property: any }) => (
    <div data-testid={`property-card-${property.id}`}>{property.name}</div>
  ),
}));

jest.mock('@/components/Loader/Loader', () => ({
  __esModule: true,
  default: () => <div data-testid="loader">Loading...</div>,
}));

jest.mock('@/components/Home/components/NoSearchResultsMessage/NoSearchResultsMessage', () => ({
  NoSearchResultsMessage: ({
    noProperties,
    noSearchResults,
  }: {
    noProperties: boolean;
    noSearchResults: boolean;
  }) => (
    <div data-testid="no-results">
      {noProperties && 'No properties available'}
      {noSearchResults && 'No search results found'}
    </div>
  ),
}));

describe('Home', () => {
  const mockGetProperties = jest.fn();

  const renderWithContext = (contextValue: any) => {
    return render(
      <HomeContext.Provider value={contextValue}>
        <Home />
      </HomeContext.Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render header and call getProperties on mount', async () => {
    const contextValue = {
      isLoading: false,
      error: null,
      properties: [],
      getProperties: mockGetProperties,
      handleInputChange: jest.fn(),
      searchFilters: {},
      handleClearFilters: jest.fn(),
    };

    renderWithContext(contextValue);

    expect(screen.getByTestId('header')).toBeInTheDocument();
    await waitFor(() => {
      expect(mockGetProperties).toHaveBeenCalledTimes(1);
    });
  });

  it('should render loader when loading', () => {
    const contextValue = {
      isLoading: true,
      error: null,
      properties: [],
      getProperties: mockGetProperties,
      handleInputChange: jest.fn(),
      searchFilters: {},
      handleClearFilters: jest.fn(),
    };

    renderWithContext(contextValue);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('should render properties when loaded', () => {
    const contextValue = {
      isLoading: false,
      error: null,
      properties: mockProperties,
      getProperties: mockGetProperties,
      handleInputChange: jest.fn(),
      searchFilters: {},
      handleClearFilters: jest.fn(),
    };

    renderWithContext(contextValue);

    expect(screen.getByTestId('property-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('property-card-2')).toBeInTheDocument();
    expect(screen.getByText('Test Property 1')).toBeInTheDocument();
    expect(screen.getByText('Test Property 2')).toBeInTheDocument();
  });

  it('should show no properties message when no properties and no filters', () => {
    const contextValue = {
      isLoading: false,
      error: null,
      properties: [],
      getProperties: mockGetProperties,
      handleInputChange: jest.fn(),
      searchFilters: {},
      handleClearFilters: jest.fn(),
    };

    renderWithContext(contextValue);

    expect(screen.getByText('No properties available')).toBeInTheDocument();
  });

  it('should show no search results message when no properties with active filters', () => {
    const contextValue = {
      isLoading: false,
      error: null,
      properties: [],
      getProperties: mockGetProperties,
      handleInputChange: jest.fn(),
      searchFilters: { name: 'Test Search' },
      handleClearFilters: jest.fn(),
    };

    renderWithContext(contextValue);

    expect(screen.getByText('No search results found')).toBeInTheDocument();
  });

  it('should not show no results message when loading', () => {
    const contextValue = {
      isLoading: true,
      error: null,
      properties: [],
      getProperties: mockGetProperties,
      handleInputChange: jest.fn(),
      searchFilters: {},
      handleClearFilters: jest.fn(),
    };

    renderWithContext(contextValue);

    expect(screen.queryByText('No properties available')).not.toBeInTheDocument();
    expect(screen.queryByText('No search results found')).not.toBeInTheDocument();
  });

  it('should detect active filters correctly', () => {
    const contextValue = {
      isLoading: false,
      error: null,
      properties: [],
      getProperties: mockGetProperties,
      handleInputChange: jest.fn(),
      searchFilters: { name: 'Test', address: '', minPrice: '', maxPrice: '' },
      handleClearFilters: jest.fn(),
    };

    renderWithContext(contextValue);

    expect(screen.getByText('No search results found')).toBeInTheDocument();
  });

  it('should not detect empty string filters as active', () => {
    const contextValue = {
      isLoading: false,
      error: null,
      properties: [],
      getProperties: mockGetProperties,
      handleInputChange: jest.fn(),
      searchFilters: { name: '', address: '', minPrice: '', maxPrice: '' },
      handleClearFilters: jest.fn(),
    };

    renderWithContext(contextValue);

    expect(screen.getByText('No properties available')).toBeInTheDocument();
  });

  it('should not detect null/undefined filters as active', () => {
    const contextValue = {
      isLoading: false,
      error: null,
      properties: [],
      getProperties: mockGetProperties,
      handleInputChange: jest.fn(),
      searchFilters: { name: null, address: undefined, minPrice: '', maxPrice: '' },
      handleClearFilters: jest.fn(),
    };

    renderWithContext(contextValue);

    expect(screen.getByText('No properties available')).toBeInTheDocument();
  });
});
