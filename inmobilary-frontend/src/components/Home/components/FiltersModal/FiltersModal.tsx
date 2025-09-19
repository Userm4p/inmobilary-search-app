import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { HomeContext } from '@/context/HomeContext';
import React, { useContext, useMemo } from 'react';

interface Props {
  children?: React.ReactNode;
}

export const FiltersModal = ({ children }: Props) => {
  const { getProperties, handleInputChange, searchFilters } = useContext(HomeContext);

  const isFormDisabled = useMemo(() => {
    if (searchFilters.minPrice && searchFilters.maxPrice) {
      return Number(searchFilters.minPrice) > Number(searchFilters.maxPrice);
    }
    return false;
  }, [searchFilters]);

  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer underline whitespace-nowrap">
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Advance Filters</DialogTitle>
          <DialogDescription>
            Use the filters below to narrow down your search results.
          </DialogDescription>
          <div>
            <Label htmlFor="property-name" className="mt-4">
              Property Name
            </Label>
            <Input
              placeholder="Search for property name"
              className="w-full mt-4"
              id="property-name"
              name="name"
              value={searchFilters.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="property-address" className="mt-4">
              Address
            </Label>
            <Input
              placeholder="Search by address"
              className="w-full mt-4"
              id="property-name"
              value={searchFilters.address}
              onChange={handleInputChange}
              name="address"
            />
          </div>
          <div>
            <Label htmlFor="property-name" className="mt-4">
              Min Price
            </Label>
            <Input
              placeholder="100000"
              type="number"
              className="w-full mt-4"
              id="property-name"
              value={searchFilters.minPrice}
              onChange={handleInputChange}
              name="minPrice"
            />
          </div>
          <div>
            <Label htmlFor="property-name" className="mt-4">
              Max Price
            </Label>
            <Input
              placeholder="10000000"
              type="number"
              className="w-full mt-4"
              id="property-name"
              value={searchFilters.maxPrice}
              onChange={handleInputChange}
              name="maxPrice"
            />
          </div>
          <DialogClose asChild disabled={isFormDisabled}>
            <Button onClick={getProperties} className="mt-4 w-full cursor-pointer">
              Apply Filters
            </Button>
          </DialogClose>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
