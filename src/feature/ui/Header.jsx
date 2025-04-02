import React from "react";
import SearchOrder from "../order/SearchOrder";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const username = useSelector((state) => state.user.username);

  return (
    <header className="flex items-center justify-between bg-blue-950 py-4 pr-4 pl-2 text-stone-300">
      <Link className="font-sans text-xl uppercase sm:text-3xl" to={"/"}>
        Fast react pizza Co.
      </Link>
      <SearchOrder />
      <h2 className="hidden font-medium capitalize sm:block">{username}</h2>
    </header>
  );
};

export default Header;
