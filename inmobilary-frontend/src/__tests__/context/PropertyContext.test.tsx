import { render, screen } from '@testing-library/react';
import { PropertyContext } from '@/context/PropertyContext';
import { useContext } from 'react';

// Test component to access context
const TestComponent = () => {
  const context = useContext(PropertyContext);
  return (
    <div>
      <div data-testid="isLoading">{context.isLoading.toString()}</div>
      <div data-testid="error">{context.error}</div>
      <div data-testid="property">{context.property ? context.property.name : 'null'}</div>
    </div>
  );
};

describe('PropertyContext', () => {
  it('should provide default context values', () => {
    render(
      <PropertyContext.Provider value={PropertyContext._currentValue}>
        <TestComponent />
      </PropertyContext.Provider>
    );

    expect(screen.getByTestId('isLoading')).toHaveTextContent('false');
    expect(screen.getByTestId('error')).toHaveTextContent('');
    expect(screen.getByTestId('property')).toHaveTextContent('null');
  });

  it('should provide context with custom values', () => {
    const customContextValue = {
      isLoading: true,
      error: 'Test error',
      property: { id: '1', name: 'Test Property' },
      getProperty: jest.fn(),
    };

    render(
      <PropertyContext.Provider value={customContextValue as any}>
        <TestComponent />
      </PropertyContext.Provider>
    );

    expect(screen.getByTestId('isLoading')).toHaveTextContent('true');
    expect(screen.getByTestId('error')).toHaveTextContent('Test error');
    expect(screen.getByTestId('property')).toHaveTextContent('Test Property');
  });
});
