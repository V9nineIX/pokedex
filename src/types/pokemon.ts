type Pokemon = {
  id: number;
  name: string;
  photoUrl: string | null;
  types: string[];
};

// API response type (add this)
type PokemonDetailApiResponse = {
  id: number;
  name: string;
  sprites: {
    front_default: string | null;
  };
  types: Array<PokemonType>;
};

type PokemonType = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

/*
{
  "count": 1328,
  "next": "https://pokeapi.co/api/v2/pokemon?offset=2&limit=1",
  "previous": "https://pokeapi.co/api/v2/pokemon?offset=0&limit=1",
  "results": [
    {
      "name": "ivysaur",
      "url": "https://pokeapi.co/api/v2/pokemon/2/"
    }
  ]
}*/
type PokemonListResponse = {
  count: number;
  next: string;
  previous: string;
  results: Pokemon[];
};

export type {
  Pokemon,
  PokemonType,
  PokemonListResponse,
  PokemonDetailApiResponse,
};
