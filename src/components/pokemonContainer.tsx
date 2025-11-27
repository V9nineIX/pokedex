'use client';
import { useState } from 'react';
import PokemonList from "@/components/pokemonList";
import TypeFilter from "@/components/header/typeFilter";
import { Filter, X } from 'lucide-react';
import usePokemon from '@/hooks/usePokemon';
import { LIMIT_PER_PAGE } from '@/constant';


export default function PokemonContainer() {


  const { pokemonState, handlePageChange, handleTypeToggle, handleClearFilters, toggleFilterDrawer } = usePokemon();
  const { pokemonList, isLoadingPokemonList, totalCount, currentPage, isFilterOpen, selectedTypes } = pokemonState;




  return (
    <div className="flex w-full flex-row gap-6">
      <div
        className={`
          h-auto bg-white shadow-lg border-b border-gray-100 relative overflow-hidden
          transition-all duration-300 ease-in-out
          ${isFilterOpen ? 'w-1/4' : 'w-18'}
        `}
      > {/*left side filter*/}
        {/* Toggle Button */}
        <div className="flex justify-end p-4">
          <button
            onClick={toggleFilterDrawer}
            className={`
              z-10 p-2 rounded-lg transition-all duration-200
              ${isFilterOpen
                ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                : 'bg-pokedex-red text-white hover:bg-red-600'
              }
            `}
            title={isFilterOpen ? 'Close Filter' : 'Open Filter'}
          >
            {isFilterOpen ? <X size={20} /> : <Filter size={20} />}
          </button>
        </div>

        <TypeFilter
          isOpen={isFilterOpen}
          selectedTypes={selectedTypes}
          onToggleType={handleTypeToggle}
          onClear={handleClearFilters}
        />
      </div>

      <div className={`transition-all duration-300 ease-in-out ${isFilterOpen ? 'w-3/4' : ' mx-auto w-[80%]'}`}>
        <PokemonList handlePageChange={handlePageChange} pokemonState={pokemonState} />
      </div>
    </div>
  );
}
