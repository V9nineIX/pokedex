'use client';
import { useState } from 'react';
import PokemonList from "@/components/pokemonList";
import TypeFilter from "@/components/header/typeFilter";

export default function PokemonContainer() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const handleTypeToggle = (type: string) => {
    setSelectedTypes((prev) => [...prev, type]);
    setIsFilterOpen(true);
  };

  const handleClearFilters = () => {
    setSelectedTypes([]);
    setIsFilterOpen(false);
  };

  return (
    <>
      <div className="w-1/4 h-auto bg-white shadow-lg border-b border-gray-100"> {/*left side filter*/}
        <TypeFilter
          isOpen={true}
          selectedTypes={selectedTypes}
          onToggleType={handleTypeToggle}
          onClear={handleClearFilters}
        />
      </div>

      <div className="w-3/4">
        <PokemonList />
      </div>
    </>
  );
}
