import { render, screen } from '@testing-library/react';
import { Header } from '@/components/Home/components/Header/Header';
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

// Mock the child components
jest.mock('@/components/Logo/Logo', () => ({
  Logo: () => <div data-testid="logo">Logo</div>,
}));

jest.mock('@/components/Home/components/SearchBar/SearchBar', () => ({
  SearchBar: () => <div data-testid="search-bar">SearchBar</div>,
}));

jest.mock('@/components/Home/components/FiltersModal/FiltersModal', () => ({
  FiltersModal: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="filters-modal">{children}</div>
  ),
}));

jest.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, ...props }: any) => (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  ),
}));

describe('Header', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render all header components', () => {
    render(
      <HomeContext.Provider value={mockContextValue as any}>
        <Header />
      </HomeContext.Provider>
    );

    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByTestId('search-bar')).toBeInTheDocument();
    expect(screen.getByTestId('filters-modal')).toBeInTheDocument();
    expect(screen.getByText('Clear Filters')).toBeInTheDocument();
    expect(screen.getByText('Advance Search')).toBeInTheDocument();
  });

  it('should call handleClearFilters when clear button is clicked', () => {
    render(
      <HomeContext.Provider value={mockContextValue as any}>
        <Header />
      </HomeContext.Provider>
    );

    const clearButton = screen.getByText('Clear Filters');
    clearButton.click();

    expect(mockContextValue.handleClearFilters).toHaveBeenCalledTimes(1);
  });

  it('should have correct styling classes', () => {
    render(
      <HomeContext.Provider value={mockContextValue as any}>
        <Header />
      </HomeContext.Provider>
    );

    const headerContainer = screen.getByTestId('logo').parentElement;
    expect(headerContainer).toHaveClass(
      'flex',
      'flex-col',
      'lg:flex-row',
      'items-center',
      'px-4',
      'py-4',
      'gap-4',
      'color-black',
      'w-full'
    );
  });
});
