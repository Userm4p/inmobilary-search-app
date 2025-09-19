import { render, screen } from '@testing-library/react';
import { RealEStateCard } from '@/components/Home/components/RealEStateCard/RealEStateCard';
import { Property } from '@/types/Property.types';

const mockProperty: Property = {
  id: '1',
  name: 'Test Property',
  address: '123 Test Street',
  price: 250000,
  ownerId: 'owner1',
  owner: {
    id: 'owner1',
    name: 'John Doe',
    address: '456 Owner Street',
    photo: 'owner.jpg',
    birthday: '1990-01-01',
  },
  images: ['property1.jpg', 'property2.jpg'],
  traces: [],
};

describe('RealEStateCard', () => {
  it('should render property information correctly', () => {
    render(<RealEStateCard property={mockProperty} />);

    expect(screen.getByText('Test Property')).toBeInTheDocument();
    expect(screen.getByText('123 Test Street')).toBeInTheDocument();
    expect(screen.getByText('Owner: John Doe')).toBeInTheDocument();
  });

  it('should render formatted price', () => {
    render(<RealEStateCard property={mockProperty} />);

    expect(screen.getByText('Price: $250,000')).toBeInTheDocument();
  });

  it('should render as a link to property detail page', () => {
    render(<RealEStateCard property={mockProperty} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/property/1');
  });

  it('should render property image with correct attributes', () => {
    render(<RealEStateCard property={mockProperty} />);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'property1.jpg');
    expect(image).toHaveAttribute('alt', 'Test Property');
  });

  it('should have correct styling classes', () => {
    render(<RealEStateCard property={mockProperty} />);

    const cardContainer = screen.getByText('Test Property').closest('div');
    expect(cardContainer).toHaveClass('w-[100%]');
  });

  it('should handle property with multiple images', () => {
    const propertyWithMultipleImages = {
      ...mockProperty,
      images: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
    };

    render(<RealEStateCard property={propertyWithMultipleImages} />);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'image1.jpg');
  });
});
