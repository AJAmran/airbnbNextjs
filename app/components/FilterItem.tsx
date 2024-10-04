"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import { categoryItems } from "@/lib/categoryItem";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function FilterItem() {
  const searchParams = useSearchParams();
  const search = searchParams.get("filter");
  const pathname = usePathname();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: scrollContainerRef.current.scrollLeft - 150,
        behavior: "smooth", // Smooth scrolling behavior
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: scrollContainerRef.current.scrollLeft + 150,
        behavior: "smooth", // Smooth scrolling behavior
      });
    }
  };

  return (
    <div className="relative w-full mt-5">
      {/* Left Arrow */}
      <button
        onClick={scrollLeft}
        className="absolute left-0 z-10 bg-white border border-gray-200 rounded-full shadow-md p-1 top-1/2 -translate-y-1/2"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Scrollable Categories */}
      <div
        className="flex gap-x-10 w-full overflow-x-scroll no-scrollbar"
        ref={scrollContainerRef}
      >
        {categoryItems.map((item) => (
          <Link
            key={item.id}
            href={pathname + "?" + createQueryString("filter", item.name)}
            className={cn(
              search === item.name
                ? "border-b-2 border-black pb-2 flex-shrink-0"
                : "opacity-70 flex-shrink-0",
              "flex flex-col gap-y-3 items-center"
            )}
          >
            <div className="w-6 h-6">{item.icon}</div>
            <p className="text-xs font-medium">{item.title}</p>
          </Link>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={scrollRight}
        className="absolute right-0 z-10 bg-white border border-gray-200 rounded-full shadow-md p-1 top-1/2 -translate-y-1/2"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}
