import LazyImage from '@/components/LazyImage/LazyImage';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { PropertyContext } from '@/context/PropertyContext';
import React, { useContext } from 'react';

export const PropertyImgCarousel = () => {
  const { property } = useContext(PropertyContext);

  return (
    <div className="lg:w-[700px] md:w-[700px] sm:w-[600px] xs:w-[450px] xxs:w-[350px] w-[300px] px-12">
      <Carousel className="w-full rounded-none">
        <CarouselContent>
          {property?.images.map((img, index) => (
            <CarouselItem key={index}>
              <LazyImage
                src={img}
                alt={`Property Image ${index + 1}`}
                className="object-cover rounded-lg w-[600px]"
                width={800}
                height={500}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
