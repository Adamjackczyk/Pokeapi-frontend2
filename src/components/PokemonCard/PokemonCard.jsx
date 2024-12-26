import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import "./PokemonCard.css";

const PokemonCard = ({ name, url }) => {
  const [expanded, setExpanded] = useState(false);
  const [details, setDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [evolutionChain, setEvolutionChain] = useState([]);
  const [isShiny, setIsShiny] = useState(false);

  // Function to flatten the evolution chain
  const flattenEvolutionChain = (chain) => {
    const evolutionPaths = [];

    const traverseChain = (currentChain, currentPath = []) => {
      const newPath = [...currentPath, currentChain.species.name];

      if (currentChain.evolves_to.length === 0) {
        evolutionPaths.push(newPath);
      } else {
        currentChain.evolves_to.forEach((evolution) => {
          traverseChain(evolution, newPath);
        });
      }
    };

    traverseChain(chain);
    return evolutionPaths;
  };

  // Function to fetch the evolution chain
  const fetchEvolutionChain = useCallback(async (speciesUrl) => {
    try {
      const speciesResponse = await fetch(speciesUrl);
      const speciesData = await speciesResponse.json();
      const evolutionResponse = await fetch(speciesData.evolution_chain.url);
      const evolutionData = await evolutionResponse.json();
      const paths = flattenEvolutionChain(evolutionData.chain);
      setEvolutionChain(paths);
    } catch (error) {
      console.error("Error fetching evolution chain:", error);
    }
  }, []);

  // Function to fetch Pokémon details
  const fetchDetails = useCallback(
    async (pokemonName) => {
      setLoadingDetails(true);
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch Pokémon details");
        }
        const data = await response.json();
        setDetails(data);
        await fetchEvolutionChain(data.species.url);
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
      } finally {
        setLoadingDetails(false);
      }
    },
    [fetchEvolutionChain]
  );

  // Navigate to a specific Pokémon in the evolution chain
  const navigateEvolution = useCallback(
    async (pokemonName) => {
      setIsShiny(false);
      await fetchDetails(pokemonName);
      setExpanded(true);
    },
    [fetchDetails]
  );

  // Get sprite URL based on shiny state
  const getSpriteUrl = () => {
    if (!details?.id) return null;
    return isShiny
      ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${details.id}.png`
      : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${details.id}.png`;
  };

  // Fetch initial Pokémon details
  useEffect(() => {
    fetchDetails(name);
  }, [name, fetchDetails]);

  return (
    <div className="pokemon-card">
      <div className="pokemon-card__image-container">
        {details?.id ? (
          <img
            src={getSpriteUrl()}
            alt={`${details.name} ${isShiny ? "shiny" : ""} sprite`}
            className="pokemon-card__image"
          />
        ) : (
          <div className="pokemon-card__image-placeholder"></div>
        )}
        <button
          className="shiny-toggle"
          onClick={() => setIsShiny(!isShiny)}
          aria-label={isShiny ? "Show normal version" : "Show shiny version"}
        >
          {isShiny ? "⭐" : "✨"}
        </button>
      </div>

      <h3 className="pokemon-card__name">
        {details?.name
          ? details.name.charAt(0).toUpperCase() + details.name.slice(1)
          : "Loading..."}
      </h3>

      <button
        className="pokemon-card__toggle"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "Hide Details" : "Show Details"}
      </button>

      {expanded && (
        <div className="pokemon-card__details">
          {loadingDetails ? (
            <p>Loading...</p>
          ) : details ? (
            <>
              <p>
                <strong>Type:</strong>{" "}
                {details.types.map((type) => type.type.name).join(", ")}
              </p>
              <p>
                <strong>Abilities:</strong>{" "}
                {details.abilities.map((ab) => ab.ability.name).join(", ")}
              </p>
              <p>
                <strong>Base Stats:</strong>
              </p>
              <div className="stats-container">
                {details.stats.map((stat) => (
                  <div key={stat.stat.name} className="stat-item">
                    <div className="stat-header">
                      <span className="stat-name">{stat.stat.name}</span>
                      <span className="stat-value">{stat.base_stat}</span>
                    </div>
                    <div className="stat-bar">
                      <div
                        className="stat-bar__fill"
                        style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {evolutionChain.length > 0 && (
                <div className="pokemon-card__evolutions">
                  {(() => {
                    const relevantPaths = evolutionChain.filter((path) =>
                      path.includes(details.name)
                    );

                    if (relevantPaths.length === 0) return null;

                    return relevantPaths.map((path, pathIndex) => {
                      const currentIndex = path.indexOf(details.name);
                      const previousEvolution =
                        currentIndex > 0 ? path[currentIndex - 1] : null;
                      const nextEvolutions = [];

                      evolutionChain.forEach((evoPath) => {
                        const index = evoPath.indexOf(details.name);
                        if (index >= 0 && index < evoPath.length - 1) {
                          const nextEvo = evoPath[index + 1];
                          if (!nextEvolutions.includes(nextEvo)) {
                            nextEvolutions.push(nextEvo);
                          }
                        }
                      });

                      return (
                        <div
                          key={pathIndex}
                          className="pokemon-card__evolution-path"
                        >
                          {previousEvolution && (
                            <div className="pokemon-card__evolution-group">
                              <p>
                                <strong>Previous Evolution:</strong>
                              </p>
                              <button
                                onClick={() =>
                                  navigateEvolution(previousEvolution)
                                }
                                className="pokemon-card__evolution-button"
                              >
                                {previousEvolution.charAt(0).toUpperCase() +
                                  previousEvolution.slice(1)}
                              </button>
                            </div>
                          )}

                          {nextEvolutions.length > 0 && (
                            <div className="pokemon-card__evolution-group">
                              <p>
                                <strong>
                                  Next Evolution
                                  {nextEvolutions.length > 1 ? "s" : ""}:
                                </strong>
                              </p>
                              <div className="pokemon-card__evolution-buttons">
                                {nextEvolutions.map((evolution, index) => (
                                  <button
                                    key={index}
                                    onClick={() => navigateEvolution(evolution)}
                                    className="pokemon-card__evolution-button"
                                  >
                                    {evolution.charAt(0).toUpperCase() +
                                      evolution.slice(1)}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })[0];
                  })()}
                </div>
              )}
            </>
          ) : (
            <p>Details could not be loaded.</p>
          )}
        </div>
      )}
    </div>
  );
};

PokemonCard.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default PokemonCard;
