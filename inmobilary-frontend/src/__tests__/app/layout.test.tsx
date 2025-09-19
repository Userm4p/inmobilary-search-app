import { render, screen } from '@testing-library/react';
import RootLayout from '@/app/layout';

// Mock the HomeContextLayout component
jest.mock('@/components/Home/components/HomeContextLayout/HomeContextLayout', () => ({
  HomeContextLayout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="home-context-layout">{children}</div>
  ),
}));

// Mock next/font/google
jest.mock('next/font/google', () => ({
  Geist: () => ({
    variable: '--font-geist-sans',
  }),
  Geist_Mono: () => ({
    variable: '--font-geist-mono',
  }),
}));

describe('RootLayout', () => {
  it('should render children wrapped in HomeContextLayout', () => {
    render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    );

    expect(screen.getByTestId('home-context-layout')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should have correct HTML structure', () => {
    render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    );

    const html = document.documentElement;
    expect(html).toHaveAttribute('lang', 'en');

    const body = document.body;
    expect(body).toHaveClass('antialiased', 'bg-stone-700');
  });

  it('should apply font variables to body', () => {
    render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    );

    const body = document.body;
    expect(body).toHaveClass('--font-geist-sans', '--font-geist-mono');
  });
});
