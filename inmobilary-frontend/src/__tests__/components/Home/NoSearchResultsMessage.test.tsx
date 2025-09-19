import { render, screen } from '@testing-library/react';
import { NoSearchResultsMessage } from '@/components/Home/components/NoSearchResultsMessage/NoSearchResultsMessage';

describe('NoSearchResultsMessage', () => {
  it('should render no properties message when noProperties is true', () => {
    render(<NoSearchResultsMessage noProperties={true} noSearchResults={false} />);

    expect(screen.getByText('No properties available.')).toBeInTheDocument();
  });

  it('should render no search results message when noSearchResults is true', () => {
    render(<NoSearchResultsMessage noProperties={false} noSearchResults={true} />);

    expect(screen.getByText('No search results found.')).toBeInTheDocument();
  });

  it('should prioritize no search results over no properties', () => {
    render(<NoSearchResultsMessage noProperties={true} noSearchResults={true} />);

    expect(screen.getByText('No search results found.')).toBeInTheDocument();
  });
});
