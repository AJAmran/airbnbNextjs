import Image from "next/image";
import React from "react";
import mobile_logo from "../../public/mobile_logo.webp";
import destop_logo from "../../public/destop_logo.png";
import { SearchComponent } from "./Search";
import { User } from "./User";

const Header = () => {
  return (
    <nav className="w-ful border-b">
      <div className="flex items-center justify-between container mx-auto px-5 lg:px-10 py-5">
        <Image
          src={destop_logo}
          alt="AirBnb Logo"
          className="w-32 hidden lg:block"
        />
        <Image
          src={mobile_logo}
          alt="AirBnb Logo"
          className="w-12 block lg:hidden"
        />
        <SearchComponent />
        <User />
      </div>
    </nav>
  );
};

export default Header;
