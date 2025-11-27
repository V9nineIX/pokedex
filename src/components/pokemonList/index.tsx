'use client'
import PokemonCard from "@/components/pokemonCard";
import ReactPaginate from "react-paginate";
import { LIMIT_PER_PAGE } from "@/constant";

interface PokemonListProps {
  handlePageChange: (page: number) => void;
  pokemonState: any;
}


const PokemonList = ({ handlePageChange, pokemonState }: { handlePageChange: (page: number) => void, pokemonState: any }) => {
  const { pokemonList, isLoadingPokemonList, totalCount, currentPage, isSearchActive, searchTerm } = pokemonState;
  const totalPages = Math.ceil(totalCount / LIMIT_PER_PAGE);

  return (
    <div>
      {isLoadingPokemonList ? (
        <div className="flex flex-col items-center justify-center py-16 text-center h-screen">
          <div className="relative w-20 h-20 mb-4">
            <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
          </div>
          <div className="text-2xl font-bold text-gray-600 mb-2">Loading...</div>
          <div className="text-gray-500">Catching Pokémon...</div>
        </div>
      ) : (
        <>
          {isSearchActive && pokemonList.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="text-2xl font-bold text-gray-600 mb-2">No Pokémon found</div>
              <div className="text-gray-500">No results found for "{searchTerm}"</div>
            </div>
          ) : (
            <>
              <div className="text-bold font-sm text-md text-gray-600 w-full text-right pb-4">
                {isSearchActive ? (
                  <>{totalCount.toLocaleString()} pokemon found for "{searchTerm}"</>
                ) : (
                  <>page {currentPage} of {totalPages} | {totalCount.toLocaleString()} pokemon found</>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-24">
                {pokemonList && pokemonList.length > 0 && pokemonList.map((pokemon: any) => (
                  <PokemonCard key={pokemon.id} pokemon={pokemon} onClick={() => { }} />
                ))}
              </div>
            </>
          )}
          {/* pagination */}
          {!isSearchActive && totalPages > 1 && (
            <>

              <div className="fixed bottom-0 left-0 right-0 flex flex-col items-center gap-4 text-black py-4 bg-gray-100 z-50 shadow-lg border-t border-gray-200">


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


            </>
          )}
        </>
      )}
    </div>
  );
};

export default PokemonList;
