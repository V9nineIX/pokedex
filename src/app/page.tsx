
import Image from "next/image";
import PokemonList from "@/components/pokemonList";
import Header from "@/components/header";
import TypeFilter from "@/components/header/typeFilter";
import PokemonContainer from "@/components/pokemonContainer";


export default function Home() {


  return (
    <div className="flex flex-col h-auto justify-center font-sans bg-gray-100 ">


      <Header />

      <main className="flex flex-row mx-auto w-full max-w-8xl p-4 ">
        <PokemonContainer />
      </main >
    </div>
  );
}
