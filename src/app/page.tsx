'use client';

import Image from "next/image";
import PokemonList from "@/components/pokemonList";
import Header from "@/components/header";
import TypeFilter from "@/components/header/typeFilter";
import PokemonContainer from "@/components/pokemonContainer";
import usePokemon from "@/hooks/usePokemon";


export default function Home() {
  const {
    pokemonState,
    handlePageChange,
    handleTypeToggle,
    handleClearFilters,
    toggleFilterDrawer,
    handleSearch,
    handleClearSearch,
    handleSearchTermChange,
  } = usePokemon();

  return (
    <div className="flex flex-col h-auto justify-center font-sans bg-gray-100 ">
      <Header
        searchTerm={pokemonState.searchTerm}
        isSearchActive={pokemonState.isSearchActive}
        onSearchChange={handleSearchTermChange}
        onSearch={handleSearch}
        onClearSearch={handleClearSearch}
      />

      <main className="flex flex-row mx-auto w-full max-w-8xl p-4 ">
        <PokemonContainer
          pokemonState={pokemonState}
          handlePageChange={handlePageChange}
          handleTypeToggle={handleTypeToggle}
          handleClearFilters={handleClearFilters}
          toggleFilterDrawer={toggleFilterDrawer}
        />
      </main >
    </div>
  );
}
