import { FilterItem } from "./components/FilterItem";
import HomeContent from "./components/HomeContent";

export default function Home({
  searchParams,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  searchParams?: Record<string, any>;
}) {
  return (
    <div className="container mx-auto px-5 text-center">
      <div className="my-8">
        <FilterItem />
      </div>
      <HomeContent searchParams={searchParams} />
    </div>
  );
}
