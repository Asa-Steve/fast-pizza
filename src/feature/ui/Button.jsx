import React from "react";
import { Link } from "react-router-dom";

const base =
  "rounded-full disabled:bg-stone-500 disabled:cursor-not-allowed cursor-pointer border px-7 py-2 text-sm sm:text-base focus:ring focus:ring-blue-900 focus:outline-0 focus:ring-offset-2 transition duration-300";
const style = {
  primary: base + " text-white bg-blue-950 hover:bg-blue-950/90 ",
  secondary: base + " text-stone-400 ",
  link: "hover:text-blue-900 py-1 ",
  small:
    "rounded-full text-white bg-blue-950 hover:bg-blue-950/90 px-2 py-2 text-xs sm:px-3 cursor-pointer transition duration-300",
  xsmall:
    "rounded-full h-[25px] w-[25px] sm:h-[30px] sm:w-[30px] text-white bg-blue-950 hover:bg-blue-950/90 px-2 text-xs cursor-pointer transition duration-300",
};

const Button = ({ children, type, to, onclick, disabled = false }) => {
  if (onclick)
    return (
      <button onClick={onclick} disabled={disabled} className={style[type]}>
        {children}
      </button>
    );
  if (to)
    return (
      <Link to={to} className={style[type]}>
        {children}
      </Link>
    );
  return (
    <button disabled={disabled} className={style[type]}>
      {children}
    </button>
  );
};

export default Button;
