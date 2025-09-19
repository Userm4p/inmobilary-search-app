import { render } from '@testing-library/react';
import { PropertyContextLayout } from '@/components/Property/components/PropertyContextLayout/PropertyContextLayout';

jest.mock('next/navigation', () => ({
  useParams: jest.fn(() => ({ id: '123' })),
}));

describe('PropertyContextLayout', () => {
  it('should render children wrapped in PropertyContext provider', () => {
    const { container } = render(
      <PropertyContextLayout>
        <div data-testid="test-child">Test Child</div>
      </PropertyContextLayout>
    );

    expect(container).toMatchSnapshot();
  });
});
