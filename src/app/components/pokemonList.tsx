'use client'
import usePokemon from "@/hooks/usePokemon";
import PokemonCard from "@/app/components/pokemonCard.tsx";

const PokemonList = () => {
  const { } = usePokemon()
  const pokemonList = [
    {
      id: 1,
      name: "Bulbasaur",
      photoUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
      types: [{ slot: 1, type: { name: "Grass", url: "https://pokeapi.co/api/v2/type/1/" } }, { slot: 2, type: { name: "Poison", url: "https://pokeapi.co/api/v2/type/4/" } }],
    },
    {
      id: 2,
      name: "Ivysaur",
      photoUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png",
      types: [{ slot: 1, type: { name: "Grass", url: "https://pokeapi.co/api/v2/type/1/" } }, { slot: 2, type: { name: "Poison", url: "https://pokeapi.co/api/v2/type/4/" } }],
    },
    {
      id: 3,
      name: "Venusaur",
      photoUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png",
      types: [{ slot: 1, type: { name: "Grass", url: "https://pokeapi.co/api/v2/type/1/" } }, { slot: 2, type: { name: "Poison", url: "https://pokeapi.co/api/v2/type/4/" } }],
    },
    {
      id: 4,
      name: "Charmander",
      photoUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
      types: [{ slot: 1, type: { name: "Fire", url: "https://pokeapi.co/api/v2/type/2/" } }],
    },
    {
      id: 5,
      name: "Charmeleon",
      photoUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png",
      types: [{ slot: 1, type: { name: "Fire", url: "https://pokeapi.co/api/v2/type/2/" } }, { slot: 2, type: { name: "Dragon", url: "https://pokeapi.co/api/v2/type/16/" } }],
    },
    {
      id: 6,
      name: "Charizard",
      photoUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",
      types: [{ slot: 1, type: { name: "Fire", url: "https://pokeapi.co/api/v2/type/2/" } }, { slot: 2, type: { name: "Dragon", url: "https://pokeapi.co/api/v2/type/16/" } }],
    },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {pokemonList.map((pokemon: any) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} onClick={() => { }} />
      ))}
    </div>
  );
};

export default PokemonList;
