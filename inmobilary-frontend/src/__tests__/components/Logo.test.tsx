import { render, screen } from '@testing-library/react';
import { Logo } from '@/components/Logo/Logo';

describe('Logo', () => {
  it('should render logo text', () => {
    render(<Logo />);

    expect(screen.getByText('Real Estate App')).toBeInTheDocument();
  });

  it('should render as h2 element', () => {
    render(<Logo />);

    const logoElement = screen.getByRole('heading', { level: 2 });
    expect(logoElement).toBeInTheDocument();
    expect(logoElement).toHaveTextContent('Real Estate App');
  });

  it('should have correct styling classes', () => {
    render(<Logo />);

    const logoElement = screen.getByRole('heading', { level: 2 });
    expect(logoElement).toHaveClass(
      'whitespace-nowrap',
      'font-bold',
      'text-shadow-lg',
      'text-white',
      'border-4',
      'border-blue-500',
      'rounded-lg',
      'p-2'
    );
  });
});
