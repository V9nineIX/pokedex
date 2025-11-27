'use client'
import usePokemon from "@/hooks/usePokemon";
import PokemonCard from "@/components/pokemonCard.tsx";
import ReactPaginate from "react-paginate";
import { LIMIT_PER_PAGE } from "@/constant";

const PokemonList = () => {
  const { pokemonState, handlePageChange } = usePokemon();
  const { pokemonList, isLoadingPokemonList, totalCount, currentPage } = pokemonState;
  const totalPages = Math.ceil(totalCount / LIMIT_PER_PAGE);

  return (
    <div>
      {isLoadingPokemonList ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {pokemonList && pokemonList.length > 0 && pokemonList.map((pokemon: any) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} onClick={() => { }} />
            ))}
          </div>
          {/* pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex flex-col items-center gap-4 text-black">
              <ReactPaginate
                pageCount={totalPages}
                pageRangeDisplayed={3}
                marginPagesDisplayed={1}
                onPageChange={(selectedItem) => handlePageChange(selectedItem.selected + 1)}
                forcePage={currentPage - 1}
                breakLabel="..."
                nextLabel="Next"
                previousLabel="Previous"
                containerClassName="flex justify-center gap-2 flex-wrap items-center"
                pageClassName=""
                pageLinkClassName="h-10 w-10 flex items-center justify-center rounded-lg font-medium shadow-sm transition-colors bg-white text-gray-700 hover:bg-gray-50 cursor-pointer"
                activeClassName="pagination-active-page"
                activeLinkClassName="pagination-active-page cursor-pointer rounded-lg"
                previousClassName=""
                previousLinkClassName="rounded-lg bg-white px-4 py-2 font-medium text-gray-700 shadow-sm hover:bg-gray-50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                nextClassName=""
                nextLinkClassName="rounded-lg bg-white px-4 py-2 font-medium text-gray-700 shadow-sm hover:bg-gray-50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                breakClassName="px-2"
                disabledClassName="opacity-50 cursor-not-allowed"
                disabledLinkClassName="opacity-50 cursor-not-allowed"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PokemonList;
