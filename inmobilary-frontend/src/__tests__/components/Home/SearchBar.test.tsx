import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from '@/components/Home/components/SearchBar/SearchBar';
import { HomeContext } from '@/context/HomeContext';

const mockContextValue = {
  isLoading: false,
  error: null,
  properties: [],
  getProperties: jest.fn(),
  handleInputChange: jest.fn(),
  searchFilters: {
    name: 'Test Property',
    address: '',
    minPrice: '',
    maxPrice: '',
  },
  handleClearFilters: jest.fn(),
};

// Mock the UI components
jest.mock('@/components/ui/input', () => ({
  Input: ({ onChange, value, name, placeholder, className, ...props }: any) => (
    <input
      onChange={onChange}
      value={value}
      name={name}
      placeholder={placeholder}
      className={className}
      {...props}
    />
  ),
}));

jest.mock('@/components/ui/button', () => ({
  Button: ({ children, className, ...props }: any) => (
    <button className={className} {...props}>
      {children}
    </button>
  ),
}));

jest.mock('lucide-react', () => ({
  Search: () => <span data-testid="search-icon">Search</span>,
}));

describe('SearchBar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render search input and button', () => {
    render(
      <HomeContext.Provider value={mockContextValue as any}>
        <SearchBar />
      </HomeContext.Provider>
    );

    expect(screen.getByPlaceholderText('Search for property name...')).toBeInTheDocument();
    expect(screen.getByTestId('search-icon')).toBeInTheDocument();
  });

  it('should display current search filter value', () => {
    render(
      <HomeContext.Provider value={mockContextValue as any}>
        <SearchBar />
      </HomeContext.Provider>
    );

    const input = screen.getByPlaceholderText('Search for property name...');
    expect(input).toHaveValue('Test Property');
  });

  it('should call handleInputChange when input value changes', () => {
    render(
      <HomeContext.Provider value={mockContextValue as any}>
        <SearchBar />
      </HomeContext.Provider>
    );

    const input = screen.getByPlaceholderText('Search for property name...');
    fireEvent.change(input, { target: { value: 'New Property' } });

    expect(mockContextValue.handleInputChange).toHaveBeenCalledTimes(1);
  });

  it('should call getProperties when form is submitted', () => {
    render(
      <HomeContext.Provider value={mockContextValue as any}>
        <SearchBar />
      </HomeContext.Provider>
    );

    const form = screen.getByPlaceholderText('Search for property name...').closest('form');
    fireEvent.submit(form!);

    expect(mockContextValue.getProperties).toHaveBeenCalledTimes(1);
  });

  it('should prevent default form submission', () => {
    render(
      <HomeContext.Provider value={mockContextValue as any}>
        <SearchBar />
      </HomeContext.Provider>
    );

    const form = screen.getByPlaceholderText('Search for property name...').closest('form');
    const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
    const preventDefaultSpy = jest.spyOn(submitEvent, 'preventDefault');

    fireEvent(form!, submitEvent);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('should have correct styling classes', () => {
    render(
      <HomeContext.Provider value={mockContextValue as any}>
        <SearchBar />
      </HomeContext.Provider>
    );

    const form = screen.getByPlaceholderText('Search for property name...').closest('form');
    expect(form).toHaveClass(
      'flex',
      'items-center',
      'gap-2',
      'w-full',
      'w-[100%]',
      'justify-center'
    );

    const input = screen.getByPlaceholderText('Search for property name...');
    expect(input).toHaveClass('md:w-[600px]', 'max-w-[600px]', 'bg-white');
  });
});
