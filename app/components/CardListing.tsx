"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCountries } from "@/lib/useCountries";
import { Heart, HeartOff } from "lucide-react";
import { Carousel } from "react-responsive-carousel";

import "react-responsive-carousel/lib/styles/carousel.min.css";

interface ListingCardProps {
  title: string;
  images: string[];
  description: string;
  location: string;
  price: number;
  homeId: string;
  isInFavoriteList: boolean;
}

export function ListingCard({
  title,
  images,
  description,
  location,
  price,
  homeId,
  isInFavoriteList,
}: ListingCardProps) {
  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(location);
  const [isFavorited, setIsFavorited] = useState(isInFavoriteList);

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <div className="flex flex-col border rounded-lg overflow-hidden shadow-md w-72">
      {/* Image Slider Section */}
      <div className="relative">
        <Carousel showThumbs={false} infiniteLoop autoPlay>
          {images?.map((image, index) => (
            <div key={index} className="relative w-full h-56">
              <Image
                src={image}
                alt={`Image of House ${index}`}
                layout="fill"
                className="rounded-lg object-cover"
              />
            </div>
          ))}
        </Carousel>

        {/* Favorite Button */}
        <div className="absolute top-2 right-2 z-10">
          <button onClick={toggleFavorite}>
            {isFavorited ? (
              <Heart className="text-red-500 w-6 h-6" />
            ) : (
              <HeartOff className="text-white w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Property Info Section */}
      <Link href={`/home/${homeId}`} className="flex flex-col items-start p-2">
        <h3 className="font-medium text-lg">{title}</h3>{" "}
        <p className="text-muted-foreground text-sm line-clamp-2">
          {description}
        </p>
        <p className="pt-2 text-muted-foreground">
          <span className="font-medium text-black">${price}</span> per Night
        </p>
      </Link>
    </div>
  );
}
