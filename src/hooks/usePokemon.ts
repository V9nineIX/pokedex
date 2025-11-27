"use client";
import { useEffect } from "react";
import { PokemonApi } from "@/service";
import { fetchPokemonList } from "@/service/poke.api";
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
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(setPokemonField({ key: "isLoadingPokemonList", value: false }));
    }
  };

  const handlePageChange = (selectedPage: number) => {
    fetchPokemon(selectedPage);
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  return {
    pokemonState,
    handlePageChange,
  };
};
export default usePokemon;
