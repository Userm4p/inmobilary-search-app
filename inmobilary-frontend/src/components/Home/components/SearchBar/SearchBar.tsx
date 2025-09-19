import { Input } from '@/components/ui/input';
import React, { useCallback, useContext } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HomeContext } from '@/context/HomeContext';

export const SearchBar = () => {
  const { getProperties, handleInputChange, searchFilters } = useContext(HomeContext);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      getProperties();
    },
    [getProperties]
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 w-full w-[100%] justify-center"
    >
      <Input
        onChange={handleInputChange}
        value={searchFilters.name}
        name="name"
        placeholder="Search for property name..."
        className="md:w-[600px] max-w-[600px] bg-white"
      />
      <Button className="cursor-pointer">
        <Search />
      </Button>
    </form>
  );
};
