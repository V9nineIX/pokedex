/**
 * --- RECURSIVE EVOLUTION NODE COMPONENT ---
 * 
 * This component renders a single Pokemon in an evolution chain and recursively
 * calls itself to render all subsequent evolutions.
 * 
 * Example: Charmander → Charmeleon → Charizard
 * - First call renders Charmander, finds Charmeleon in evolves_to
 * - Second call (recursion) renders Charmeleon, finds Charizard in evolves_to  
 * - Third call (recursion) renders Charizard, no more evolutions → STOPS
 * 
 * @param link - Current evolution node containing species data and next evolutions
 * @param pokemonDetail - Currently displayed Pokemon (to highlight the active one)
 * @param onSelectPokemon - Callback function to change displayed Pokemon when clicked
 */

import { ChainLink } from "@/types";
import { getPokemonIdFromUrl } from "@/service/poke.api";
import { PokemonDetail, PokemonListResult } from "@/types";
import { TEXT_COLORS } from "@/constant";
import { ArrowRight } from "lucide-react";

const EvolutionNode = ({ link, pokemonDetail, onSelectPokemon }: { link: ChainLink, pokemonDetail: PokemonDetail, onSelectPokemon: (pokemon: string) => void }) => {

  // Safety check: return null if pokemonDetail is undefined
  if (!pokemonDetail) {
    return null;
  }

  // Get the primary type (first type) to apply correct colors
  const primaryType = pokemonDetail.types?.[0]?.type?.name || '';
  const textClass = TEXT_COLORS[primaryType] || 'text-gray-500';

  // Extract Pokemon ID from the species URL (e.g., "https://pokeapi.co/api/v2/pokemon-species/25/" → "25")
  const id = getPokemonIdFromUrl(link.species.url);

  // Construct image URL for the Pokemon sprite
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  // Check if this evolution node is the currently displayed Pokemon
  // Used to highlight the active Pokemon in the evolution chain
  const isCurrent = pokemonDetail.id === id;

  /**
   * Handle click on evolution node
   * Only trigger navigation if:
   * 1. Callback function exists
   * 2. User didn't click the currently displayed Pokemon (no point navigating to same Pokemon)
   */
  const handleNodeClick = () => {
    if (onSelectPokemon && !isCurrent) {
      onSelectPokemon(id.toString());
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-4">
      {/* ===== POKEMON NODE: Display single Pokemon in the evolution chain ===== */}
      <div
        className={`flex flex-col items-center group cursor-pointer transition-all duration-300 ${isCurrent ? 'opacity-100 scale-105' : 'opacity-60 hover:opacity-100 hover:scale-105'}`}
        onClick={handleNodeClick}
      >
        {/* Pokemon Image Container - Highlighted if current, dimmed otherwise */}
        <div className={`relative h-24 w-24 md:h-28 md:w-28 rounded-full flex items-center justify-center shadow-sm border-2 ${isCurrent ? 'bg-white border-' + primaryType : 'bg-gray-50 border-gray-100'}`}>
          <img src={imageUrl} alt={link.species.name} className="h-full w-full object-contain p-2" loading="lazy" />
        </div>

        {/* Pokemon Name - Colored if current, gray otherwise */}
        <span className={`mt-2 text-sm font-bold capitalize ${isCurrent ? textClass : 'text-gray-500'}`}>
          {link.species.name}
        </span>

        {/* Evolution Level Badge - Only show if evolution has level requirement */}
        {link.evolution_details[0]?.min_level && (
          <span className="text-xs text-gray-400 font-medium bg-gray-100 px-2 py-0.5 rounded-full mt-1">
            Lvl {link.evolution_details[0].min_level}
          </span>
        )}
      </div>

      {/* ===== RECURSIVE SECTION: Render next evolutions ===== */}
      {/* 
        BASE CASE: If evolves_to array is empty, this section won't render and recursion stops
        RECURSIVE CASE: If Pokemon has evolutions, render them by calling EvolutionNode again
        
        Example flow for Bulbasaur → Ivysaur → Venusaur:
        1. Call 1: Bulbasaur has evolves_to[Ivysaur] → render arrow + call EvolutionNode(Ivysaur)
        2. Call 2: Ivysaur has evolves_to[Venusaur] → render arrow + call EvolutionNode(Venusaur)  
        3. Call 3: Venusaur has evolves_to[] (empty) → no render → RECURSION STOPS ✋
        
        Handles branching evolutions (like Eevee with 8 paths) by mapping through all items
      */}
      {link.evolves_to.length > 0 && (
        <div className="flex flex-col md:flex-row items-center gap-4">
          {/* Arrow separator between evolutions (horizontal on desktop, vertical on mobile) */}
          <ArrowRight size={24} className="text-gray-300 hidden md:block" />
          <div className="h-8 w-0.5 bg-gray-200 md:hidden"></div>

          {/* Container for next evolution(s) - handles multiple branches */}
          <div className="flex flex-col gap-8 md:gap-4">
            {/* 🔄 RECURSION HAPPENS HERE: Call EvolutionNode for each next evolution */}
            {link.evolves_to.map((nextLink, index) => (
              <EvolutionNode
                key={`${nextLink.species.name}-${index}`}
                link={nextLink}                    // Next evolution's data
                pokemonDetail={pokemonDetail}       // Pass current Pokemon through (for highlighting)
                onSelectPokemon={onSelectPokemon}   // Pass callback through (for navigation)
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EvolutionNode;