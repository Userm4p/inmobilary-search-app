import { render, screen } from '@testing-library/react';
import Loader from '@/components/Loader/Loader';

describe('Loader', () => {
  it('should render loading spinner and text', () => {
    render(<Loader />);

    expect(screen.getByText('Loading')).toBeInTheDocument();
    expect(screen.getByText('Loading').parentElement).toBeInTheDocument();
  });

  it('should have correct styling classes', () => {
    render(<Loader />);

    const container = screen.getByText('Loading').parentElement;
    expect(container).toHaveClass('flex', 'justify-center', 'items-center', 'py-4', 'w-full');
  });
});
