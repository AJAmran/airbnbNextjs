import { demoData } from "@/lib/DemoData";
import { FilterItem } from "./components/FilterItem";
import { Suspense } from "react";
import SkeltonLoading from "./components/SkeltonLoading";
import { ListingCard } from "./components/CardListing";
import { NoItems } from "./components/NotFoundItem";

// Replace backend call with demo data
async function getHomesData(searchParams: {
  filter?: string;
  title: string;
  country?: string;
  guest?: string;
  room?: string;
  bathroom?: string;
}) {
  // Filtering demo data based on searchParams if needed
  return demoData;
}

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    filter?: string;
    country?: string;
    guest?: string;
    room?: string;
    bathroom?: string;
  };
}) {
  const data = await getHomesData(searchParams);

  return (
    <div className="container mx-auto px-5 text-center">
      {/* Centered Filter Item Section */}
      <div className="my-8">
        <FilterItem />
      </div>

      {/* Suspense for loading state */}
      <Suspense fallback={<SkeltonLoading />}>
        {data.length === 0 ? (
          <NoItems
            description="Please check a different category or create your own listing!"
            title="Sorry, no listings found for this category..."
          />
        ) : (
          <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
            {data.map((item) => (
              <ListingCard
                key={item.id}
                title={item.title}
                images={item.images}
                description={item.description}
                location={item.country}
                price={item.price}
                homeId={item.id}
                isInFavoriteList={item.isFavorite}
              />
            ))}
          </div>
        )}
      </Suspense>
    </div>
  );
}
