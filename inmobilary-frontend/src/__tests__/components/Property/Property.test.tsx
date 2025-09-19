import { render, screen, waitFor } from '@testing-library/react';
import Property from '@/components/Property/Property';
import { PropertyContext } from '@/context/PropertyContext';

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
  images: ['image1.jpg', 'image2.jpg'],
  traces: [],
};

// Mock child components
jest.mock('@/components/Property/components/Header/Header', () => ({
  Header: () => <div data-testid="property-header">Property Header</div>,
}));

jest.mock('@/components/Property/components/PropertyImgCarousel/PropertyImgCarousel', () => ({
  PropertyImgCarousel: () => <div data-testid="property-carousel">Property Carousel</div>,
}));

jest.mock('@/components/Property/components/InformationCard/InformationCard', () => ({
  InformationCard: () => <div data-testid="information-card">Information Card</div>,
}));

jest.mock('@/components/Loader/Loader', () => ({
  __esModule: true,
  default: () => <div data-testid="loader">Loading...</div>,
}));

describe('Property', () => {
  const mockGetProperty = jest.fn();

  const renderWithContext = (contextValue: any) => {
    return render(
      <PropertyContext.Provider value={contextValue}>
        <Property />
      </PropertyContext.Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render loader when loading', () => {
    const contextValue = {
      isLoading: true,
      error: null,
      property: null,
      getProperty: mockGetProperty,
    };

    renderWithContext(contextValue);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('should call getProperty on mount', async () => {
    const contextValue = {
      isLoading: false,
      error: null,
      property: mockProperty,
      getProperty: mockGetProperty,
    };

    renderWithContext(contextValue);

    await waitFor(() => {
      expect(mockGetProperty).toHaveBeenCalledTimes(1);
    });
  });

  it('should render error message when there is an error', () => {
    const contextValue = {
      isLoading: false,
      error: 'Failed to load property',
      property: null,
      getProperty: mockGetProperty,
    };

    renderWithContext(contextValue);

    expect(screen.getByText('Failed to load property')).toBeInTheDocument();
    expect(screen.getByText('Failed to load property')).toHaveClass(
      'text-red-500',
      'text-2xl',
      'font-bold'
    );
  });

  it('should render property details when loaded successfully', () => {
    const contextValue = {
      isLoading: false,
      error: null,
      property: mockProperty,
      getProperty: mockGetProperty,
    };

    renderWithContext(contextValue);

    expect(screen.getByTestId('property-header')).toBeInTheDocument();
    expect(screen.getByTestId('property-carousel')).toBeInTheDocument();
    expect(screen.getByTestId('information-card')).toBeInTheDocument();
    expect(screen.getByText('Test Property')).toBeInTheDocument();
  });

  it('should render property name with correct styling', () => {
    const contextValue = {
      isLoading: false,
      error: null,
      property: mockProperty,
      getProperty: mockGetProperty,
    };

    renderWithContext(contextValue);

    const propertyName = screen.getByText('Test Property');
    expect(propertyName).toHaveClass(
      'text-white',
      'text-3xl',
      'font-bold',
      'bg-gray-900',
      'bg-opacity-50',
      'mt-8',
      'p-4',
      'md:w-[604px]',
      'sm:w-[504px]',
      'xs:w-[360px]',
      'xxs:w-[350px]',
      'w-[300px]',
      'rounded-lg'
    );
  });

  it('should render main container with correct styling', () => {
    const contextValue = {
      isLoading: false,
      error: null,
      property: mockProperty,
      getProperty: mockGetProperty,
    };

    renderWithContext(contextValue);

    const mainContainer = screen.getByText('Test Property').closest('div')?.parentElement;
    expect(mainContainer).toHaveClass(
      'flex',
      'lg:items-start',
      'items-center',
      'lg:flex-row',
      'flex-col',
      'justify-center',
      'lg:gap-8',
      'gap-10',
      'mt-4',
      'p-4'
    );
  });

  it('should render carousel container with correct styling', () => {
    const contextValue = {
      isLoading: false,
      error: null,
      property: mockProperty,
      getProperty: mockGetProperty,
    };

    renderWithContext(contextValue);

    const carouselContainer = screen.getByTestId('property-carousel').parentElement;
    expect(carouselContainer).toHaveClass('flex', 'flex-col', 'justify-center', 'items-center');
  });
});
