const BASE_URL = "https://pokeapi.co/api/v2";

export const fetchPokemonList = async (offset = 0, limit = 20) => {
  try {
    const response = await fetch(
      `${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Pokémon list:", error);
    throw error;
  }
};
