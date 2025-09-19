import { render, screen } from '@testing-library/react';
import PropertyPage from '@/app/property/[id]/page';

// Mock the Property component
jest.mock('@/components/Property/Property', () => ({
  __esModule: true,
  default: () => <div data-testid="property-component">Property Component</div>,
}));

describe('Property Page', () => {
  it('should render Property component', () => {
    render(<PropertyPage />);

    expect(screen.getByTestId('property-component')).toBeInTheDocument();
  });
});
