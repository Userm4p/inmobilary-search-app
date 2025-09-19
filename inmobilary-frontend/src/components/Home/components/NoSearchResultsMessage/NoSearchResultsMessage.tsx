import React from 'react';

interface Props {
  noProperties: boolean;
  noSearchResults: boolean;
}

export const NoSearchResultsMessage = ({ noProperties, noSearchResults }: Props) => {
  return (
    <>
      <div className="flex justify-center items-center py-4 w-full">
        {noProperties && <span className="ml-2 text-sm text-white">No properties available.</span>}
        {noSearchResults && (
          <span className="ml-2 text-sm text-white">No search results found.</span>
        )}
      </div>
    </>
  );
};
