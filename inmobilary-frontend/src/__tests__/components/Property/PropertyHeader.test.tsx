import { render } from '@testing-library/react';
import { Header } from '@/components/Property/components/Header/Header';

describe('Property Header', () => {
  it('should render header component', () => {
    const { container } = render(<Header />);

    expect(container).toMatchSnapshot();
  });
});
