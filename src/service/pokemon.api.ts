import { fetchData, postData, patchData, putData, deleteData } from "./service";
import { LIMIT_PER_PAGE } from "../app/constant";
import {
  Pokemon,
  PokemonListResponse,
  PokemonDetailApiResponse,
  PokemonType,
} from "../types/pokemon";

const getPokemonList = async (): Promise<Pokemon[]> => {
  const response = await fetchData<PokemonListResponse>(
    "/pokemon?limit=" + LIMIT_PER_PAGE + "&offset=0"
  );
  // get detail
  const detailedPromises = response.results.map(async (pokemon: any) => {
    const detailResponse = await fetch(pokemon.url);

    if (!detailResponse.ok) throw new Error(`Failed to fetch ${pokemon.name}`);
    return detailResponse.json();
  });
  // wait for all detailed responses
  const detailedResponses = await Promise.all(detailedPromises);

  // map detailed responses to pokemon list
  const pokemonList: Pokemon[] = detailedResponses.map(
    (response: PokemonDetailApiResponse) => {
      return {
        id: response.id,
        name: response.name,
        photoUrl: response.sprites.front_default,
        types: response.types.map((type: PokemonType) => type.type.name),
      };
    }
  );

  console.log("pokemonList", pokemonList);

  return pokemonList;
};

export { getPokemonList };
