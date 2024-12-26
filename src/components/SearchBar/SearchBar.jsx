import React from "react";
import PropTypes from "prop-types";
import "./SearchBar.css";

const SearchBar = ({ searchTerm, handleSearch, placeholder }) => {
  return (
    <div className="search-bar">
      <label htmlFor="search-input" className="search-label">
        Search Pokémon:
      </label>
      <input
        type="text"
        id="search-input"
        className="search-input"
        placeholder={placeholder || "Enter Pokémon name"}
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
};

SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default SearchBar;
