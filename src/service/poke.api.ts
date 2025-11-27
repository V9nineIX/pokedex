import {
  PokemonListResponse,
  PokemonDetail,
  PokemonSpecies,
  PokemonListResult,
  PokemonDetailApiResponse,
  EvolutionChainResponse,
} from "@/types";

import { LIMIT_PER_PAGE, BASE_URL } from "@/constant";

export const fetchPokemonListByTypes = async (
  types: string[],
  page: number = 1
): Promise<PokemonListResponse> => {
  // Handle edge case: empty types array
  if (types.length === 0) {
    return {
      count: 0,
      next: null,
      previous: null,
      results: [],
      pokemonDetailList: [],
    };
  }

  // Fetch pokemon for each type in parallel
  const typePromises = types.map((type) => fetchByType(type));
  const typeResults = await Promise.all(typePromises);

  // Combine all pokemon arrays (OR logic - any pokemon with at least one selected type)
  const allPokemon: PokemonListResult[] = [];
  const pokemonMap = new Map<string, PokemonListResult>();

  // Deduplicate pokemon by name/url
  typeResults.forEach((pokemonList) => {
    pokemonList.forEach((pokemon) => {
      if (!pokemonMap.has(pokemon.name)) {
        pokemonMap.set(pokemon.name, pokemon);
        allPokemon.push(pokemon);
      }
    });
  });

  const totalCount = allPokemon.length;

  // Apply client-side pagination
  const offset = (page - 1) * LIMIT_PER_PAGE;
  const paginatedPokemon = allPokemon.slice(offset, offset + LIMIT_PER_PAGE);

  // Fetch details for paginated pokemon
  const detailedPromises = paginatedPokemon.map(
    async (pokemon: PokemonListResult) => {
      const detail = await fetchPokemonDetails(pokemon.url);
      return detail;
    }
  );
  const detailedResponses = await Promise.all(detailedPromises);

  // Map detailed responses to pokemon list
  const pokemonDetailList: PokemonDetail[] = detailedResponses.map(
    (response: PokemonDetailApiResponse) => {
      return {
        id: response.id,
        name: response.name,
        photoUrl:
          response.sprites.other?.["official-artwork"]?.front_default ??
          response.sprites.front_default,
        types: response.types,
        stats: response.stats,
      };
    }
  );

  // Calculate next and previous URLs
  const hasNext = offset + LIMIT_PER_PAGE < totalCount;
  const hasPrevious = page > 1;

  return {
    count: totalCount,
    next: hasNext ? `page=${page + 1}` : null,
    previous: hasPrevious ? `page=${page - 1}` : null,
    results: paginatedPokemon,
    pokemonDetailList: pokemonDetailList,
  };
};

export const fetchPokemonList = async (
  page: number = 1
): Promise<PokemonListResponse> => {
  const offset = (page - 1) * LIMIT_PER_PAGE;
  const pokemonList: PokemonListResponse = await fetchAllPokemon(offset);
  //TODO: get
  const detailedPromises = pokemonList.results.map(
    async (pokemon: PokemonListResult) => {
      const detail = await fetchPokemonDetails(pokemon.url);
      return detail;
    }
  );
  const detailedResponses = await Promise.all(detailedPromises);
  // map detailed responses to pokemon list
  const pokemonDetailList: PokemonDetail[] = detailedResponses.map(
    (response: PokemonDetailApiResponse) => {
      return {
        id: response.id,
        name: response.name,
        photoUrl:
          response.sprites.other?.["official-artwork"]?.front_default ??
          response.sprites.front_default,
        types: response.types,
        stats: response.stats,
      };
    }
  );

  pokemonList.pokemonDetailList = pokemonDetailList;

  return pokemonList;
};

export const fetchAllPokemon = async (
  offset: number = 0
): Promise<PokemonListResponse> => {
  // Fetch a large list to handle search client-side for better UX
  const response = await fetch(
    `${BASE_URL}/pokemon?limit=${LIMIT_PER_PAGE}&offset=${offset}`
  );
  const data: PokemonListResponse = await response.json();
  return data;
};

export const fetchPokemonDetails = async (
  url: string
): Promise<PokemonDetailApiResponse> => {
  const response = await fetch(url);
  return response.json();
};

export const fetchEvolutionChain = async (
  url: string
): Promise<EvolutionChainResponse> => {
  const response = await fetch(url);
  return response.json();
};

export const fetchPokemonFullDetail = async (
  nameOrId: string | number
): Promise<any | null> => {
  try {
    const response = await fetchPokemonByNameOrId(nameOrId);
    if (!response) {
      throw new Error("Failed to fetch Pokémon details");
    }
    //TODO: get species and evolution chain
    const species = await fetchPokemonSpecies(response.id);
    const evolutionChain = await fetchEvolutionChain(
      species.evolution_chain.url
    );
    const pokemonDetail = {
      ...response,
      species: species,
      photoUrl:
        response.sprites.other?.["official-artwork"]?.front_default ??
        response.sprites.front_default,
      evolutionChain: evolutionChain,
    };

    return pokemonDetail;
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
    return null;
  }
};

export const fetchPokemonByNameOrId = async (
  nameOrId: string | number
): Promise<PokemonDetailApiResponse | null> => {
  try {
    const response = await fetch(`${BASE_URL}/pokemon/${nameOrId}`);
    if (!response.ok) {
      if (response.status === 404) {
        return null; // Pokémon not found
      }
      throw new Error(`Failed to fetch Pokémon: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
    return null;
  }
};

export const fetchPokemonSpecies = async (
  id: number
): Promise<PokemonSpecies> => {
  const response = await fetch(`${BASE_URL}/pokemon-species/${id}`);
  return response.json();
};

export const fetchByType = async (
  type: string
): Promise<PokemonListResult[]> => {
  const response = await fetch(`${BASE_URL}/type/${type}`);
  const data = await response.json();
  // Transform type structure to match list structure
  return data.pokemon.map((p: any) => p.pokemon);
};

export const getPokemonIdFromUrl = (url: string): number => {
  const parts = url.split("/").filter(Boolean);
  return parseInt(parts[parts.length - 1], 10);
};

export const formatPokemonId = (id: number): string => {
  return `#${id.toString().padStart(3, "0")}`;
};
