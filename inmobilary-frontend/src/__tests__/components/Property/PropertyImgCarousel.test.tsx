import { render } from '@testing-library/react';
import { PropertyImgCarousel } from '@/components/Property/components/PropertyImgCarousel/PropertyImgCarousel';
import { PropertyContext } from '@/context/PropertyContext';

// Mock Embla Carousel
jest.mock('embla-carousel-react', () => ({
  __esModule: true,
  default: jest.fn(() => [
    jest.fn(), // carouselRef
    {
      canScrollPrev: jest.fn(() => false),
      canScrollNext: jest.fn(() => false),
      scrollPrev: jest.fn(),
      scrollNext: jest.fn(),
      on: jest.fn(),
      off: jest.fn(),
    }, // api
  ]),
  useEmblaCarousel: jest.fn(() => [
    jest.fn(), // carouselRef
    {
      canScrollPrev: jest.fn(() => false),
      canScrollNext: jest.fn(() => false),
      scrollPrev: jest.fn(),
      scrollNext: jest.fn(),
      on: jest.fn(),
      off: jest.fn(),
    }, // api
  ]),
}));

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
  images: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
  traces: [],
};

const mockContextValue = {
  isLoading: false,
  error: null,
  property: mockProperty,
  getProperty: jest.fn(),
};

describe('PropertyImgCarousel', () => {
  it('should render carousel with property images', () => {
    const { container } = render(
      <PropertyContext.Provider
        value={{
          property: mockContextValue.property,
          isLoading: mockContextValue.isLoading,
          error: mockContextValue.error,
          getProperty: mockContextValue.getProperty,
        }}
      >
        <PropertyImgCarousel />
      </PropertyContext.Provider>
    );

    expect(container).toMatchSnapshot();
  });
});
