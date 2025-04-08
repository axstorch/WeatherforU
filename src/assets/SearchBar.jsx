import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [weather, setWeather] = useState("");

  const handleSearch = (eve) => {
    if (eve.key === "Enter") {
      onSearch(weather);
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-bar"
        placeholder="Search here"
        value={weather}
        onChange={(e) => setWeather(e.target.value)}
        onKeyDown={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
