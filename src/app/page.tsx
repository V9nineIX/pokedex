import Image from "next/image";
import PokemonList from "./components/pokemonList";

export default function Home() {
  return (
    <div className="flex h-auto justify-center font-sans bg-gray-100 ">
      <main className="flex-1 mx-auto w-full max-w-6xl p-4 md:p-6">
        <h1 className="text-2xl font-bold mb-4 text-black">Pokedex</h1>
        <PokemonList />
      </main >
    </div >
  );
}
