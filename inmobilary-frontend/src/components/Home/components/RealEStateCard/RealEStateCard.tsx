'use client';
import { Card } from '@/components/ui/card';
import { formatMoney } from '@/lib/utils';
import { Property } from '@/types/Property.types';
import React from 'react';
import LazyImage from '../../../LazyImage/LazyImage';
import Link from 'next/link';

interface Props {
  property: Property;
}

export const RealEStateCard = ({ property }: Props) => {
  return (
    <div className="max-w-[400px] w-full h-auto transition-transform duration-300 ease-in-out hover:scale-105 group-hover:scale-105">
      <Card className="py-0 shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out cursor-pointer">
        <Link href={`/property/${property.id}`} className="block w-full">
          <div>
            <LazyImage
              className="object-fill rounded-t-xl"
              src={property.images[0]}
              alt={property.name}
              width={400}
              height={250}
            />
            <div className="w-[100%]">
              <h1 className="text-lg ml-2 py-2">{property.name}</h1>
              <hr />
              <div className="flex flex-col gap-1 items-start justify-start p-2 mb-2">
                <h2 className="text-md font-bold">{property.address}</h2>
                <span className="text-xs font-semibold">Price: {formatMoney(property.price)}</span>
                <span className="text-xs">Owner: {property.owner.name}</span>
              </div>
            </div>
          </div>
        </Link>
      </Card>
    </div>
  );
};
