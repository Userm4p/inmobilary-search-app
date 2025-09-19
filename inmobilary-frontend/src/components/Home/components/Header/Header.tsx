import React from 'react';
import { SearchBar } from '../SearchBar/SearchBar';
import { FiltersModal } from '../FiltersModal/FiltersModal';
import { Logo } from '@/components/Logo/Logo';

export const Header = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center px-4 py-4 gap-4 color-black w-full">
      <Logo />
      <SearchBar />
      <FiltersModal>
        <span className="cursor-pointer text-wrap-nowrap text-white">Advance Search</span>
      </FiltersModal>
    </div>
  );
};
