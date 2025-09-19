import { render, screen } from '@testing-library/react';
import { InformationCard } from '@/components/Property/components/InformationCard/InformationCard';
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

const mockContextValue = {
  isLoading: false,
  error: null,
  property: mockProperty,
  getProperty: jest.fn(),
};

describe('InformationCard', () => {
  it('should render property information', () => {
    const { container } = render(
      <PropertyContext.Provider value={mockContextValue as any}>
        <InformationCard />
      </PropertyContext.Provider>
    );

    expect(container).toMatchSnapshot();
  });
});
