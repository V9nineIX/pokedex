'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Badge from '../badge';

interface PokemonCardProps {
  pokemon: any;
  onClick?: (pokemon: any) => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onClick }) => {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick(pokemon);
    }
    router.push(`/detail/${pokemon.id}`);
  };

  return (
    <div
      className="group relative flex flex-col items-center rounded-xl bg-pokedex-bg shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer overflow-hidden border border-gray-100"
      onClick={handleClick}
    >
      <div className="absolute right-2 top-2 text-xs font-medium text-gray-400">
        {/* {formatPokemonId(id)} */}
        #{pokemon.id}
      </div>

      <div className="z-10 mt-4 flex h-32 w-32 items-center justify-center p-2">
        <img
          src={pokemon.photoUrl}
          alt={pokemon.name}
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
      </div>

      <div className="mt-2 w-full p-3 text-center flex-col flex gap-3 bg-gray-100">
        <h2 className="text-sm font-medium capitalize text-gray-800">
          {pokemon.name}
        </h2>
        <div className="flex flex-wrap gap-1 w-full text-black">
          {pokemon.types.map((type: any) => (

            <Badge key={"id-" + type.type.name} variant="type" type={type.type.name} size="sm">
              {type.type.name}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;