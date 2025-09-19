import React, { useContext } from 'react';
import { SearchBar } from '../SearchBar/SearchBar';
import { FiltersModal } from '../FiltersModal/FiltersModal';
import { Logo } from '@/components/Logo/Logo';
import { Button } from '@/components/ui/button';
import { HomeContext } from '@/context/HomeContext';

export const Header = () => {
  const { handleClearFilters } = useContext(HomeContext);

  return (
    <div className="flex flex-col lg:flex-row items-center px-4 py-4 gap-4 color-black w-full">
      <Logo />
      <SearchBar />
      <Button onClick={handleClearFilters} variant={'outline'} className="cursor-pointer">
        Clear Filters
      </Button>
      <FiltersModal>
        <span className="cursor-pointer text-wrap-nowrap text-white">Advance Search</span>
      </FiltersModal>
    </div>
  );
};
