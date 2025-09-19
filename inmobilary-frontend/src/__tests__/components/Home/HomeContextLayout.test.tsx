import { render, screen } from '@testing-library/react';
import { useContext } from 'react';
import { HomeContextLayout } from '@/components/Home/components/HomeContextLayout/HomeContextLayout';
import { HomeContext } from '@/context/HomeContext';

const mockContextValue = {
  isLoading: false,
  error: null,
  properties: [],
  getProperties: jest.fn(),
  handleInputChange: jest.fn(),
  searchFilters: {},
  handleClearFilters: jest.fn(),
};

describe('HomeContextLayout', () => {
  it('should render children wrapped in HomeContext provider', () => {
    render(
      <HomeContextLayout>
        <div data-testid="test-child">Test Child</div>
      </HomeContextLayout>
    );

    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('should provide HomeContext to children', () => {
    const TestComponent = () => {
      const context = useContext(HomeContext);
      return <div data-testid="context-value">{context.isLoading ? 'Loading' : 'Not Loading'}</div>;
    };

    render(
      <HomeContextLayout>
        <TestComponent />
      </HomeContextLayout>
    );

    expect(screen.getByTestId('context-value')).toHaveTextContent('Not Loading');
  });
});
