
'use client'

import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Ruler, Weight, ArrowRight, ArrowLeft } from 'lucide-react';
import { PokemonListResult, PokemonDetail, ChainLink } from '@/types';
import { fetchPokemonDetails, fetchPokemonSpecies, fetchEvolutionChain, formatPokemonId, getPokemonIdFromUrl } from '@/service/poke.api';
import { TYPE_COLORS, TEXT_COLORS } from '@/constant';
import StatBar from './statBar';
import { useRouter } from 'next/navigation';
import EvolutionNode from './evolutionNode';
import Badge from '../badge';


interface PokemonDetailViewProps {
  pokemonDetail: PokemonDetail;
}

const PokemonDetailView: React.FC<PokemonDetailViewProps> = ({
  pokemonDetail,
}) => {
  const router = useRouter();



  if (!pokemonDetail) return null;

  const onSelectPokemon = (id: string) => {
    router.push(`/detail/${id}`);
  }

  const primaryType = pokemonDetail.types?.[0]?.type?.name || '';
  const bgClass = TYPE_COLORS[primaryType] || 'bg-gray-500';
  const textClass = TEXT_COLORS[primaryType] || 'text-gray-500';
  const evolutionChain = pokemonDetail.evolutionChain;
  const species = pokemonDetail.species;

  // Get flavor text in English
  const description = species?.flavor_text_entries.find(
    (entry) => entry.language.name === 'en'
  )?.flavor_text.replace(/\f/g, ' ');




  return (
    <div className={`min-h-screen w-full flex flex-col ${bgClass} transition-colors duration-500`}>

      {/* Top Navigation & Info Section */}
      <div className="relative z-10 p-6 pb-0 flex flex-col max-w-5xl mx-auto w-full">
        {/* Nav Header */}
        <div className="flex items-center justify-between text-white mb-6">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 hover:bg-white/20 px-3 py-2 rounded-lg transition-colors"
          >
            <ArrowLeft size={28} />
            <span className="font-bold text-lg hidden sm:inline">Pokedex</span>
          </button>
          <div className="flex items-center gap-4">
            {/* Maybe a favorite heart here later */}
            <span className="text-2xl font-bold opacity-90">#{pokemonDetail.id}</span>
          </div>
        </div>

        {/* Pokemon Title & Types */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white capitalize tracking-wide drop-shadow-sm mb-2">
              {pokemonDetail.name}
            </h1>
            <div className="flex flex-wrap gap-2">
              {pokemonDetail.types && pokemonDetail.types.map((t) => (
                <Badge
                  key={t.type.name}
                  variant="type"
                  type={t.type.name}
                  size="md"
                  className="capitalize font-bold"
                >
                  {t.type.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Image Display Area */}
      <div className="relative flex-1 flex flex-col items-center justify-end w-full max-w-5xl mx-auto">


        {/* Main Image */}
        <div className="relative z-20 -mb-12 md:-mb-16 h-64 w-64 md:h-80 md:w-80 lg:h-96 lg:w-96">

          {pokemonDetail.photoUrl ? (
            <img
              src={pokemonDetail.photoUrl}
              alt={pokemonDetail.name}
              loading="lazy"
              className="h-full w-full object-contain drop-shadow-2xl animate-fade-in"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-gray-400">
              No Image Available
            </div>
          )}
        </div>

        {/* White Info Card (Scrollable Content) */}
        <div className="bg-white w-full rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] pt-16 px-6 md:px-12 pb-12 min-h-[50vh]">
          <div className="max-w-4xl mx-auto space-y-12">

            {/* About Grid */}
            <div className="grid md:grid-cols-2 gap-8 md:gap-16">
              {/* Description & Stats Column */}
              <div className="space-y-8">
                <div>
                  <h3 className={`text-xl font-bold mb-4 ${textClass}`}>About</h3>
                  {description && (
                    <p className="text-gray-600 leading-relaxed text-lg">
                      {description}
                    </p>
                  )}
                </div>



                <div>
                  <h3 className={`text-xl font-bold mb-4 ${textClass}`}>Abilities</h3>
                  <div className="flex flex-wrap gap-2">
                    {pokemonDetail.abilities && pokemonDetail.abilities.map(a => (
                      <span
                        key={a.ability.name}
                        className={`px-4 py-2 rounded-xl text-sm font-medium capitalize border ${a.is_hidden ? 'bg-gray-100 text-gray-500 border-gray-200 border-dashed' : 'bg-white text-gray-800 border-gray-200 shadow-sm'}`}
                        title={a.is_hidden ? 'Hidden Ability' : 'Ability'}
                      >
                        {a.ability.name.replace('-', ' ')}
                        {a.is_hidden && <span className="ml-1 text-xs opacity-70">(Hidden)</span>}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Base Stats Column */}
              <div>
                <h3 className={`text-xl font-bold mb-6 ${textClass}`}>Base Stats</h3>
                <div className="space-y-4">
                  {pokemonDetail.stats && pokemonDetail.stats.map(stat => (
                    <StatBar
                      key={stat.stat.name}
                      name={stat.stat.name}
                      value={stat.base_stat}
                      colorClass={textClass}
                    />
                  ))}
                </div>

              </div>
            </div>

            {/* Evolution Chain (Full Width) */}
            {evolutionChain && evolutionChain.chain && (
              <div className="pt-4 border-t border-gray-100">
                <h3 className={`text-xl font-bold mb-8 text-center ${textClass}`}>Evolution Chain</h3>
                <div className="flex justify-center overflow-x-auto py-4">
                  <EvolutionNode link={evolutionChain.chain} pokemonDetail={pokemonDetail} onSelectPokemon={onSelectPokemon} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailView;
