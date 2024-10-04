"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
  const [isFavorite, setIsFavorite] = useState(isInFavoriteList);

  const toggleFavorite = () => {
    // Make an API call to toggle the favorite state here
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg transition-transform duration-300 transform hover:scale-105">
      <div className="relative">
        <Carousel
          showArrows={true}
          showThumbs={false}
          dynamicHeight={true}
          className="h-64"
        >
          {images.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={`${title} image ${index + 1}`}
              width={400}
              height={300}
              className="w-full h-56 object-cover"
            />
          ))}
        </Carousel>
        <button
          onClick={toggleFavorite}
          aria-label="Add to favorites"
          className="absolute top-3 left-3 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition"
        >
          {isFavorite ? (
            <HeartOff className="text-red-500 w-6 h-6" />
          ) : (
            <Heart className="text-gray-500 w-6 h-6" />
          )}
        </button>
      </div>
      <div className="flex flex-col p-4">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <p className="text-gray-600">{location}</p>
        <p className="mt-2 text-gray-700">{description}</p>
        <p className="mt-4 text-lg font-semibold text-gray-900">
          ${price}/night
        </p>
        <Link
          href={`/listing/${homeId}`}
          className="mt-2 text-blue-600 hover:underline"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
