import { render, screen, fireEvent } from '@testing-library/react';
import { FiltersModal } from '@/components/Home/components/FiltersModal/FiltersModal';
import { HomeContext } from '@/context/HomeContext';

const mockContextValue = {
  isLoading: false,
  error: null,
  properties: [],
  getProperties: jest.fn(),
  handleInputChange: jest.fn(),
  searchFilters: {
    name: 'Test Property',
    address: 'Test Address',
    minPrice: '100000',
    maxPrice: '500000',
  },
  handleClearFilters: jest.fn(),
};

// Mock the UI components
jest.mock('@/components/ui/dialog', () => ({
  Dialog: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dialog">{children}</div>
  ),
  DialogTrigger: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <button className={className} data-testid="dialog-trigger">
      {children}
    </button>
  ),
  DialogContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dialog-content">{children}</div>
  ),
  DialogHeader: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dialog-header">{children}</div>
  ),
  DialogTitle: ({ children }: { children: React.ReactNode }) => (
    <h2 data-testid="dialog-title">{children}</h2>
  ),
  DialogDescription: ({ children }: { children: React.ReactNode }) => (
    <p data-testid="dialog-description">{children}</p>
  ),
  DialogClose: ({
    children,
    disabled,
    ...props
  }: {
    children: React.ReactNode;
    disabled?: boolean;
  }) => (
    <button disabled={disabled} {...props} data-testid="dialog-close">
      {children}
    </button>
  ),
}));

jest.mock('@/components/ui/input', () => ({
  Input: ({ onChange, value, name, placeholder, type, className, id, ...props }: any) => (
    <input
      onChange={onChange}
      value={value}
      name={name}
      placeholder={placeholder}
      type={type}
      className={className}
      id={id}
      {...props}
    />
  ),
}));

jest.mock('@/components/ui/label', () => ({
  Label: ({
    children,
    htmlFor,
    className,
  }: {
    children: React.ReactNode;
    htmlFor?: string;
    className?: string;
  }) => (
    <label htmlFor={htmlFor} className={className}>
      {children}
    </label>
  ),
}));

jest.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, className, ...props }: any) => (
    <button onClick={onClick} className={className} {...props}>
      {children}
    </button>
  ),
}));

describe('FiltersModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render modal trigger with children', () => {
    render(
      <HomeContext.Provider value={mockContextValue as any}>
        <FiltersModal>
          <span>Advance Search</span>
        </FiltersModal>
      </HomeContext.Provider>
    );

    expect(screen.getByText('Advance Search')).toBeInTheDocument();
    expect(screen.getByTestId('dialog-trigger')).toBeInTheDocument();
  });

  it('should render modal content with all form fields', () => {
    render(
      <HomeContext.Provider value={mockContextValue as any}>
        <FiltersModal>
          <span>Advance Search</span>
        </FiltersModal>
      </HomeContext.Provider>
    );

    expect(screen.getByTestId('dialog-title')).toHaveTextContent('Advance Filters');
    expect(screen.getByTestId('dialog-description')).toHaveTextContent(
      'Use the filters below to narrow down your search results.'
    );

    // Check all input fields
    expect(screen.getByPlaceholderText('Search for property name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search by address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('100000')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('10000000')).toBeInTheDocument();
  });

  it('should display current filter values', () => {
    render(
      <HomeContext.Provider value={mockContextValue as any}>
        <FiltersModal>
          <span>Advance Search</span>
        </FiltersModal>
      </HomeContext.Provider>
    );

    expect(screen.getByDisplayValue('Test Property')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Address')).toBeInTheDocument();
    expect(screen.getByDisplayValue('100000')).toBeInTheDocument();
    expect(screen.getByDisplayValue('500000')).toBeInTheDocument();
  });

  it('should call handleInputChange when input values change', () => {
    render(
      <HomeContext.Provider value={mockContextValue as any}>
        <FiltersModal>
          <span>Advance Search</span>
        </FiltersModal>
      </HomeContext.Provider>
    );

    const nameInput = screen.getByPlaceholderText('Search for property name');
    fireEvent.change(nameInput, { target: { value: 'New Property' } });

    expect(mockContextValue.handleInputChange).toHaveBeenCalledTimes(1);
  });

  it('should call getProperties when apply button is clicked', () => {
    render(
      <HomeContext.Provider value={mockContextValue as any}>
        <FiltersModal>
          <span>Advance Search</span>
        </FiltersModal>
      </HomeContext.Provider>
    );

    const applyButton = screen.getByText('Apply Filters');
    fireEvent.click(applyButton);

    expect(mockContextValue.getProperties).toHaveBeenCalledTimes(1);
  });

  it('should disable apply button when minPrice > maxPrice', () => {
    const contextWithInvalidPrices = {
      ...mockContextValue,
      searchFilters: {
        ...mockContextValue.searchFilters,
        minPrice: '500000',
        maxPrice: '100000',
      },
    };

    render(
      <HomeContext.Provider value={contextWithInvalidPrices as any}>
        <FiltersModal>
          <span>Advance Search</span>
        </FiltersModal>
      </HomeContext.Provider>
    );

    const applyButton = screen.getByTestId('dialog-close');
    expect(applyButton).toBeDisabled();
  });

  it('should render all labels correctly', () => {
    render(
      <HomeContext.Provider value={mockContextValue as any}>
        <FiltersModal>
          <span>Advance Search</span>
        </FiltersModal>
      </HomeContext.Provider>
    );

    expect(screen.getByText('Property Name')).toBeInTheDocument();
    expect(screen.getByText('Address')).toBeInTheDocument();
    expect(screen.getByText('Min Price')).toBeInTheDocument();
    expect(screen.getByText('Max Price')).toBeInTheDocument();
  });

  it('should have correct input types', () => {
    render(
      <HomeContext.Provider value={mockContextValue as any}>
        <FiltersModal>
          <span>Advance Search</span>
        </FiltersModal>
      </HomeContext.Provider>
    );

    const minPriceInput = screen.getByPlaceholderText('100000');
    const maxPriceInput = screen.getByPlaceholderText('10000000');

    expect(minPriceInput).toHaveAttribute('type', 'number');
    expect(maxPriceInput).toHaveAttribute('type', 'number');
  });
});
