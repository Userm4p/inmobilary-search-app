import { render, screen } from '@testing-library/react';
import { HomeContext } from '@/context/HomeContext';
import { useContext } from 'react';

// Test component to access context
const TestComponent = () => {
  const context = useContext(HomeContext);
  return (
    <div>
      <div data-testid="isLoading">{context.isLoading.toString()}</div>
      <div data-testid="error">{context.error}</div>
      <div data-testid="properties-length">{context.properties.length}</div>
      <div data-testid="search-filters">{JSON.stringify(context.searchFilters)}</div>
    </div>
  );
};

describe('HomeContext', () => {
  it('should provide default context values', () => {
    render(
      <HomeContext.Provider value={HomeContext._currentValue}>
        <TestComponent />
      </HomeContext.Provider>
    );

    expect(screen.getByTestId('isLoading')).toHaveTextContent('false');
    expect(screen.getByTestId('error')).toHaveTextContent('');
    expect(screen.getByTestId('properties-length')).toHaveTextContent('0');
    expect(screen.getByTestId('search-filters')).toHaveTextContent('{}');
  });

  it('should provide context with custom values', () => {
    const customContextValue = {
      isLoading: true,
      error: 'Test error',
      properties: [{ id: '1', name: 'Test Property' }],
      getProperties: jest.fn(),
      handleInputChange: jest.fn(),
      searchFilters: { name: 'Test' },
      handleClearFilters: jest.fn(),
    };

    render(
      <HomeContext.Provider value={customContextValue as any}>
        <TestComponent />
      </HomeContext.Provider>
    );

    expect(screen.getByTestId('isLoading')).toHaveTextContent('true');
    expect(screen.getByTestId('error')).toHaveTextContent('Test error');
    expect(screen.getByTestId('properties-length')).toHaveTextContent('1');
    expect(screen.getByTestId('search-filters')).toHaveTextContent('{"name":"Test"}');
  });
});
