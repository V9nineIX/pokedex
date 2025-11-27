"use client";
import { useEffect } from "react";
import { PokemonApi } from "@/service";
import { fetchPokemonList } from "@/service/poke.api";

const usePokemon = () => {
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        // const response = await PokemonApi.getPokemonList();
        const response = await fetchPokemonList();
        console.log(response);
      } catch (err) {
        console.log(err);
      } finally {
        console.log("finally");
      }
    };
    fetchPokemon();
    console.log("usePokemon");
  }, []);

  return {};
};

export default usePokemon;
