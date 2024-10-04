"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardHeader } from "@/components/ui/card";
import { Counter } from "./Counter";
import { HomeMap } from "./MapContainer";
import { CalendarComponent } from "./CalendarComponent";
import { useCountries } from "@/lib/useCountries";

export function SearchComponent() {
  const [searchType, setSearchType] = useState<"stays" | "experiences">(
    "stays"
  );
  const [modalContent, setModalContent] = useState<
    "where" | "checkin" | "checkout" | "calendar" | "guests" | null
  >(null);
  const [locationValue, setLocationValue] = useState("");
  const [guestCount, setGuestCount] = useState({
    adults: 0,
    children: 0,
    infants: 0,
  });
  const { getAllCountries } = useCountries();

  const renderModalContent = () => {
    switch (modalContent) {
      case "where":
        return (
          <>
            <DialogHeader>
              <DialogTitle>Where</DialogTitle>
            </DialogHeader>
            <Select
              required
              onValueChange={(value) => setLocationValue(value)}
              value={locationValue}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Search Destination" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Suggested Destinations</SelectLabel>
                  {getAllCountries().map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.flag} {item.label} / {item.region}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <HomeMap locationValue={locationValue} />
          </>
        );

      case "checkin":
      case "checkout":
      case "calendar":
        return (
          <>
            <DialogHeader>
              <DialogTitle>
                {modalContent === "checkin"
                  ? "Check-in"
                  : modalContent === "checkout"
                  ? "Check-out"
                  : "Date"}
              </DialogTitle>
            </DialogHeader>
            <CalendarComponent />
          </>
        );

      case "guests":
        return (
          <>
            <DialogHeader>
              <DialogTitle>Who</DialogTitle>
            </DialogHeader>
            <Card>
              <CardHeader className="flex flex-col gap-y-5">
                {["Adults", "Children", "Infants"].map((type) => (
                  <div className="flex items-center justify-between" key={type}>
                    <div className="flex flex-col">
                      <h3 className="underline font-medium">{type}</h3>
                      <p className="text-muted-foreground text-sm">
                        {type === "Adults"
                          ? "Ages 13 or above"
                          : type === "Children"
                          ? "Ages 2 – 12"
                          : "Under 2"}
                      </p>
                    </div>
                    <Counter
                      name={type.toLowerCase()}
                      onChange={(value) =>
                        setGuestCount((prev) => ({
                          ...prev,
                          [type.toLowerCase()]: value,
                        }))
                      }
                    />
                  </div>
                ))}
              </CardHeader>
            </Card>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog>
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex items-center gap-2">
          <Button
            variant={searchType === "stays" ? "outline" : "ghost"}
            onClick={() => setSearchType("stays")}
          >
            Stays
          </Button>
          <Button
            variant={searchType === "experiences" ? "outline" : "ghost"}
            onClick={() => setSearchType("experiences")}
          >
            Experiences
          </Button>
        </div>
        <DialogTrigger asChild>
          <div className="rounded-full py-2 px-5 border flex items-center cursor-pointer">
            <div className="flex h-full divide-x font-medium">
              <p className="px-4" onClick={() => setModalContent("where")}>
                Where
              </p>
              <p
                className="px-4"
                onClick={() =>
                  setModalContent(
                    searchType === "stays" ? "checkin" : "calendar"
                  )
                }
              >
                {searchType === "stays" ? "Check-in" : "Date"}
              </p>
              {searchType === "stays" && (
                <p className="px-4" onClick={() => setModalContent("checkout")}>
                  Check-out
                </p>
              )}
              <p className="px-4" onClick={() => setModalContent("guests")}>
                Who
              </p>
            </div>
            <Search className="bg-primary text-white p-1 h-8 w-8 rounded-full" />
          </div>
        </DialogTrigger>
      </div>
      <DialogContent className="w-full max-w-lg mx-auto mt-4">
        <form className="gap-4 flex flex-col">
          <input type="hidden" name="country" value={locationValue} />
          <input type="hidden" name="adults" value={guestCount.adults} />
          <input type="hidden" name="children" value={guestCount.children} />
          <input type="hidden" name="infants" value={guestCount.infants} />
          {renderModalContent()}
        </form>
      </DialogContent>
    </Dialog>
  );
}
