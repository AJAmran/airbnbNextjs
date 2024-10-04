/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useEffect, useState } from "react";
import { getHomesData } from "@/lib/fetchHomesData";
import SkeltonLoading from "./SkeltonLoading";
import { ListingCard } from "./CardListing";
import { NoItems } from "./NotFoundItem";

const HomeContent = ({
  searchParams,
}: {
  searchParams?: Record<string, any>;
}) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const homesData = await getHomesData(searchParams);
        setData(homesData);
      } catch (error) {
        console.error("Error fetching homes:", error);
        setError("Error fetching homes.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);

  if (loading) {
    return <SkeltonLoading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      {data.length === 0 ? (
        <NoItems
          description="Please check a different category or create your own listing!"
          title="No listings found"
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
    </>
  );
};

export default HomeContent;
