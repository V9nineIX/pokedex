"use client";
import { useEffect } from "react";

import {
  fetchPokemonList,
  fetchPokemonListByTypes,
  fetchPokemonByNameOrId,
} from "@/service/poke.api";
import { useDispatch, useSelector } from "react-redux";
import { setPokemonList, setPokemonField } from "@/store/slices/pokemon";
import { PokemonDetail, PokemonListResult } from "@/types";

const usePokemon = () => {
  const dispatch = useDispatch();
  const pokemonState = useSelector((state: any) => state.pokemon);
  const fetchPokemon = async (page: number = 1) => {
    try {
      dispatch(setPokemonField({ key: "isLoadingPokemonList", value: true }));
      const response = await fetchPokemonList(page);
      dispatch(
        setPokemonList({
          pokemonList: response.pokemonDetailList,
          currentPage: page,
          totalCount: response.count,
          next: response.next,
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(setPokemonField({ key: "isLoadingPokemonList", value: false }));
    }
  };

  const handlePageChange = (selectedPage: number) => {
    if (pokemonState.isSearchActive) {
      // Don't allow pagination when search is active
      return;
    }
    if (pokemonState.selectedTypes.length > 0) {
      onFetchPokemonListByTypes(pokemonState.selectedTypes, selectedPage);
    } else {
      fetchPokemon(selectedPage);
    }
  };

  const handleTypeToggle = (type: string) => {
    const isSelected = pokemonState.selectedTypes.includes(type);
    const newSelectedTypes = isSelected
      ? pokemonState.selectedTypes.filter((t: string) => t !== type)
      : [...pokemonState.selectedTypes, type];

    dispatch(
      setPokemonField({
        key: "selectedTypes",
        value: newSelectedTypes,
      })
    );

    if (newSelectedTypes.length > 0) {
      onFetchPokemonListByTypes(newSelectedTypes, 1);
    } else {
      resetPokemonList();
    }
  };

  const handleClearFilters = () => {
    resetPokemonList();
  };

  const toggleFilterDrawer = () => {
    dispatch(
      setPokemonField({
        key: "isFilterOpen",
        value: !pokemonState.isFilterOpen,
      })
    );
  };

  const onFetchPokemonListByTypes = async (
    types: string[],
    page: number = 1
  ) => {
    try {
      //clear search term
      if (pokemonState.searchTerm) {
        dispatch(setPokemonField({ key: "searchTerm", value: "" }));
        dispatch(setPokemonField({ key: "isSearchActive", value: false }));
      }

      dispatch(setPokemonField({ key: "isLoadingPokemonList", value: true }));
      const response = await fetchPokemonListByTypes(types, page);

      dispatch(
        setPokemonList({
          pokemonList: response.pokemonDetailList,
          currentPage: page,
          totalCount: response.count,
          next: response.next,
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(setPokemonField({ key: "isLoadingPokemonList", value: false }));
    }
  };

  const resetPokemonList = () => {
    dispatch(setPokemonField({ key: "selectedTypes", value: [] }));
    fetchPokemon(1);
  };

  const handleSearch = async () => {
    const searchTerm = pokemonState.searchTerm.trim().toLowerCase();

    if (!searchTerm) {
      handleClearSearch();
      return;
    }

    try {
      dispatch(setPokemonField({ key: "isLoadingPokemonList", value: true }));
      dispatch(setPokemonField({ key: "isSearchActive", value: true }));

      // Clear type filters when searching
      dispatch(setPokemonField({ key: "selectedTypes", value: [] }));

      // Direct API call - works for both name and ID
      const result = await fetchPokemonByNameOrId(searchTerm);

      if (result) {
        // Found - convert to PokemonDetail format
        const pokemonDetail: PokemonDetail = {
          id: result.id,
          name: result.name,
          photoUrl:
            result.sprites.other?.["official-artwork"]?.front_default ??
            result.sprites.front_default,
          types: result.types,
          stats: result.stats,
        };

        dispatch(
          setPokemonList({
            pokemonList: [pokemonDetail],
            currentPage: 1,
            totalCount: 1,
            next: null,
          })
        );
      } else {
        // No results found
        dispatch(
          setPokemonList({
            pokemonList: [],
            currentPage: 1,
            totalCount: 0,
            next: null,
          })
        );
      }
    } catch (err) {
      console.error("Search error:", err);
      dispatch(setPokemonField({ key: "isLoadingPokemonList", value: false }));
      dispatch(setPokemonField({ key: "isSearchActive", value: false }));
    }
  };

  const handleClearSearch = () => {
    dispatch(setPokemonField({ key: "searchTerm", value: "" }));
    dispatch(setPokemonField({ key: "isSearchActive", value: false }));
    resetPokemonList();
  };

  const handleSearchTermChange = (value: string) => {
    dispatch(setPokemonField({ key: "searchTerm", value: value }));
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  return {
    pokemonState,
    handlePageChange,
    handleTypeToggle,
    handleClearFilters,
    toggleFilterDrawer,
    handleSearch,
    handleClearSearch,
    handleSearchTermChange,
  };
};
export default usePokemon;
