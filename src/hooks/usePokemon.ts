"use client";
import { useEffect } from "react";
import { PokemonApi } from "@/service";
import { fetchPokemonList, fetchPokemonListByTypes } from "@/service/poke.api";
import { useDispatch, useSelector } from "react-redux";
import { setPokemonList, setPokemonField } from "@/store/slices/pokemon";

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

  useEffect(() => {
    fetchPokemon();
  }, []);

  return {
    pokemonState,
    handlePageChange,
    handleTypeToggle,
    handleClearFilters,
    toggleFilterDrawer,
  };
};
export default usePokemon;
