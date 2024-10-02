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
    "where" | "calendar" | "guests" | null
  >(null);
  const [locationValue, setLocationValue] = useState("");
  const { getAllCountries } = useCountries();

  const renderModalContent = () => {
    if (modalContent === "where") {
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
              <SelectValue placeholder="Search Destinations" />
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
    }

    if (modalContent === "calendar") {
      return (
        <>
          <DialogHeader>
            <DialogTitle>Choose Date</DialogTitle>
          </DialogHeader>
          <CalendarComponent />
        </>
      );
    }

    if (modalContent === "guests") {
      return (
        <>
          <DialogHeader>
            <DialogTitle>Who</DialogTitle>
          </DialogHeader>
          <Card>
            <CardHeader className="flex flex-col gap-y-5">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <h3 className="underline font-medium">Adults</h3>
                  <p className="text-muted-foreground text-sm">
                    Ages 13 or above
                  </p>
                </div>
                <Counter name="adults" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <h3 className="underline font-medium">Children</h3>
                  <p className="text-muted-foreground text-sm">Ages 2 – 12</p>
                </div>
                <Counter name="children" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <h3 className="underline font-medium">Infants</h3>
                  <p className="text-muted-foreground text-sm">Under 2</p>
                </div>
                <Counter name="infants" />
              </div>
            </CardHeader>
          </Card>
        </>
      );
    }
  };

  return (
    <Dialog>
      <div className="flex flex-col items-center justify-center gap-4">
        {/* Centering toggle buttons */}
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

        {/* Centering search section */}
        <DialogTrigger asChild>
          <div className="rounded-full py-2 px-5 border flex items-center cursor-pointer">
            <div className="flex h-full divide-x font-medium">
              <p className="px-4" onClick={() => setModalContent("where")}>
                Anywhere
              </p>
              <p className="px-4" onClick={() => setModalContent("calendar")}>
                Any {searchType === "stays" ? "Week" : "Date"}
              </p>
              <p className="px-4" onClick={() => setModalContent("guests")}>
                Add Guests
              </p>
            </div>
            <Search className="bg-primary text-white p-1 h-8 w-8 rounded-full" />
          </div>
        </DialogTrigger>
      </div>

      <DialogContent className="sm:max-w-[600px]">
        <form className="gap-4 flex flex-col">
          <input type="hidden" name="country" value={locationValue} />
          {renderModalContent()}
        </form>
      </DialogContent>
    </Dialog>
  );
}
