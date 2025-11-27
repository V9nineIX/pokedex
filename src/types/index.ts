export interface PokemonListResult {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListResult[]; // list of pokemon
  pokemonDetailList: PokemonDetail[]; // list of pokemon details
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface PokemonDetail {
  id: number;
  name: string;
  // height: number;
  // weight: number;
  photoUrl: string | null;
  types?: PokemonType[];
  stats?: PokemonStat[];

  // sprites: {
  //   other: {
  //     "official-artwork": {
  //       front_default: string;
  //     };
  //     home: {
  //       front_default: string;
  //     };
  //   };
  //   front_default: string;
  // };
  // abilities: PokemonAbility[];
}

export interface PokemonSpecies {
  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
    };
    version: {
      name: string;
    };
  }[];
  evolution_chain: {
    url: string;
  };
  genera: {
    genus: string;
    language: {
      name: string;
    };
  }[];
}

export interface PokemonDetailApiResponse {
  id: number;
  name: string;
  sprites: {
    front_default: string | null;
  };
  types: Array<PokemonType>;
  stats?: PokemonStat[];
}

export enum TypeColor {
  rock = "rock",
  ghost = "ghost",
  steel = "steel",
  water = "water",
  grass = "grass",
  psychic = "psychic",
  ice = "ice",
  dark = "dark",
  fairy = "fairy",
  normal = "normal",
  fighting = "fighting",
  flying = "flying",
  poison = "poison",
  ground = "ground",
  bug = "bug",
  fire = "fire",
  electric = "electric",
  dragon = "dragon",
}
