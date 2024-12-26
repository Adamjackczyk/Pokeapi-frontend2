import React, { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import PokemonCard from "../PokemonCard/PokemonCard";
import Preloader from "../Preloader/Preloader";
import "./Main.css";

//hey
const Main = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedPokemon, setSearchedPokemon] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to search for Pokémon
  const searchPokemon = async (name) => {
    if (!name.trim()) return;

    setLoading(true);
    setError(null);
    setSearchedPokemon(null);

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase().trim()}`
      );
      if (!response.ok) {
        throw new Error("Pokémon not found");
      }
      const data = await response.json();
      setSearchedPokemon({ name: data.name, url: data.species.url });
    } catch {
      setError("not_found");
    } finally {
      setLoading(false);
    }
  };

  // Handle search input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    searchPokemon(searchTerm);
  };

  return (
    <main className="main">
      <section className="main__intro">
        <h1 className="main__intro-title">
          Welcome to the World of Pokémon! 🌟
        </h1>
        <p className="main__intro-text">
          Discover the fascinating world of Pokémon with our interactive site.
          Search for your favorite Pokémon, learn about their stats, and explore
          a growing collection of creatures from the PokéAPI. Whether you're a
          seasoned Trainer or a curious newcomer, there's something here for
          everyone!
        </p>
      </section>

      <section className="main__search">
        <h2 className="main__search-title">Find Your Favorite Pokémon</h2>
        <form onSubmit={handleSubmit} className="search-form">
          <SearchBar
            searchTerm={searchTerm}
            handleSearch={handleSearch}
            placeholder="Enter a Pokémon name..."
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
        <div className="main__search-results">
          {loading && <Preloader />}
          {error === "not_found" && (
            <div className="main__ditto-placeholder">
              <img
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
                alt="Ditto sprite"
                className="main__ditto-image"
              />
              <p className="main__ditto-text">Pokémon not found!</p>
            </div>
          )}
          {searchedPokemon && (
            <PokemonCard
              name={searchedPokemon.name}
              url={searchedPokemon.url}
            />
          )}
        </div>
      </section>
    </main>
  );
};

export default Main;
