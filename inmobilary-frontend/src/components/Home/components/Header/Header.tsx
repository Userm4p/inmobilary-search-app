import React from 'react';
import { SearchBar } from '../SearchBar/SearchBar';
import { FiltersModal } from '../FiltersModal/FiltersModal';

export const Header = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center px-4 py-4 gap-4 color-black w-full">
      <h2 className="whitespace-nowrap font-bold text-shadow-lg text-white">Real Estate App</h2>
      <SearchBar />
      <FiltersModal>
        <span className="cursor-pointer text-wrap-nowrap text-white">Advance Search</span>
      </FiltersModal>
    </div>
  );
};
