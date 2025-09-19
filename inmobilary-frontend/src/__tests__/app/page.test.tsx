import { render, screen } from '@testing-library/react';
import Page from '@/app/page';

// Mock the Home component
jest.mock('@/components/Home/Home', () => ({
  __esModule: true,
  default: () => <div data-testid="home-component">Home Component</div>,
}));

describe('Page', () => {
  it('should render Home component', () => {
    render(<Page />);

    expect(screen.getByTestId('home-component')).toBeInTheDocument();
  });
});
