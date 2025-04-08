import React, { useState } from "react";

const SearchBar = ({ onSearchChange }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (eve) => {
    if (eve.key === "Enter") {
      onSearchChange(query);
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-bar"
        placeholder="Search here"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyUp={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
