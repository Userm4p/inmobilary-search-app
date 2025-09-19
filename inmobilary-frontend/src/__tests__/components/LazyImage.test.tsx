import { render, screen } from '@testing-library/react';
import LazyImage from '@/components/LazyImage/LazyImage';

// Mock IntersectionObserver
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = mockIntersectionObserver;

describe('LazyImage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render with default props', () => {
    render(<LazyImage src="test.jpg" />);

    const container = screen;
    expect(container).toMatchSnapshot();
  });
});
