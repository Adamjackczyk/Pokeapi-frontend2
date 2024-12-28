import React, { useState, useEffect } from "react";
import PokemonCard from "../PokemonCard/PokemonCard";
import Preloader from "../Preloader/Preloader";
import SearchBar from "../SearchBar/SearchBar";
import { fetchPokemonList } from "../../utils/PokeApi";
import "./DataPage.css";

const DataPage = () => {
  // State to store the list of Pokémon
  const [pokemon, setPokemon] = useState([]);
  // State to manage loading status
  const [loading, setLoading] = useState(false);
  // State to handle any errors
  const [error, setError] = useState(null);
  // Limit for the number of Pokémon to fetch per request
  const limit = 6;
  // Total number of Pokémon available
  const total = 1118;
  // State to manage the search term
  const [searchTerm, setSearchTerm] = useState("");

  // Load Pokémon data from local storage on component mount
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("pokemon")) || [];
    if (storedData.length > 0) {
      setPokemon(storedData);
    }
  }, []);

  // Save Pokémon data to local storage whenever the pokemon state changes
  useEffect(() => {
    localStorage.setItem("pokemon", JSON.stringify(pokemon));
  }, [pokemon]);

  // Function to generate a random offset
  const getRandomOffset = (max) => {
    return Math.floor(Math.random() * max);
  };

  // Function to load Pokémon data from the API
  const loadPokemon = async () => {
    setLoading(true);
    try {
      const newPokemon = [];
      const seenPokemon = new Set(pokemon.map((p) => p.name));

      while (newPokemon.length < limit) {
        const randomOffset = getRandomOffset(total);
        const data = await fetchPokemonList(randomOffset, 1);
        const poke = data.results[0];
        if (!seenPokemon.has(poke.name)) {
          newPokemon.push(poke);
          seenPokemon.add(poke.name);
        }
      }

      // Update the state with the new Pokémon
      setPokemon((prev) => [...prev, ...newPokemon]);
    } catch (err) {
      // Handle any errors that occur during the fetch
      setError("Failed to fetch Pokémon data.");
    } finally {
      // Set loading to false once the fetch is complete
      setLoading(false);
    }
  };

  // Handler for the "Show More" button to load more Pokémon
  const handleShowMore = () => {
    loadPokemon();
  };

  // Handler to clear the Pokémon data from local storage and reset the state
  const handleClearCache = () => {
    localStorage.removeItem("pokemon");
    setPokemon([]);
  };

  // Handler to update the search term state based on user input
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter the Pokémon list based on the search term
  const filteredPokemon = pokemon.filter((poke) =>
    poke.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Check if all Pokémon have been loaded
  const allLoaded = pokemon.length >= total;

  return (
    <div className="data-page">
      <h2 className="data-page__title">Pokémon List</h2>
      <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
      {error && <p className="data-page__error">{error}</p>}

      <div className="pokemon-grid">
        {filteredPokemon.map((poke, index) => (
          <PokemonCard key={index} name={poke.name} url={poke.url} />
        ))}
      </div>

      {loading && <Preloader />}

      <div className="button-container">
        {!loading && !allLoaded && (
          <button className="show-more-button" onClick={handleShowMore}>
            Show More
          </button>
        )}
        {pokemon.length > 0 && (
          <button className="clear-cache-button" onClick={handleClearCache}>
            Clear Cache
          </button>
        )}
      </div>

      {allLoaded && <p className="all-loaded">All Pokémon loaded.</p>}
    </div>
  );
};

export default DataPage;
