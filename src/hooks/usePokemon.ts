"use client";
import { useEffect } from "react";
import { PokemonApi } from "@/service";
import { fetchPokemonList } from "@/service/poke.api";
import { useDispatch, useSelector } from "react-redux";
import { setPokemonList, setPokemonField } from "@/store/slices/pokemon";

const usePokemon = () => {
  const dispatch = useDispatch();
  const { pokemonList, isLoadingPokemonList } = useSelector(
    (state: any) => state.pokemon
  );
  const fetchPokemon = async () => {
    try {
      // const response = await PokemonApi.getPokemonList();
      dispatch(setPokemonField({ key: "isLoadingPokemonList", value: true }));
      const response = await fetchPokemonList();
      dispatch(setPokemonList({ pokemonList: response, currentPage: 1 }));
    } catch (err) {
      console.log(err);
      dispatch(setPokemonField({ key: "isLoadingPokemonList", value: false }));
    }
  };
  useEffect(() => {
    fetchPokemon();
  }, []);

  return {
    pokemonList,
    isLoadingPokemonList,
  };
};
export default usePokemon;
