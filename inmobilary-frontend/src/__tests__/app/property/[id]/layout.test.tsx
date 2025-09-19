import { render, screen } from '@testing-library/react';
import PropertyLayout from '@/app/property/[id]/layout';

// Mock the PropertyContextLayout component
jest.mock('@/components/Property/components/PropertyContextLayout/PropertyContextLayout', () => ({
  PropertyContextLayout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="property-context-layout">{children}</div>
  ),
}));

describe('Property Layout', () => {
  it('should render children wrapped in PropertyContextLayout', () => {
    render(
      <PropertyLayout>
        <div>Test Content</div>
      </PropertyLayout>
    );

    expect(screen.getByTestId('property-context-layout')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
});
