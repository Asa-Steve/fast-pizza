import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchOrder = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    navigate(`/order/${query}`);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="# Track order"
          className="w-30 rounded-full border border-slate-300 px-2 py-1 text-center text-sm transition-all duration-300 focus:ring focus:ring-blue-500 focus:ring-offset-1 focus:outline-0 sm:w-60 sm:focus:w-70"
        />
      </form>
    </div>
  );
};

export default SearchOrder;
