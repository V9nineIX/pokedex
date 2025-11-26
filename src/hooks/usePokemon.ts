"use client";
import { useEffect } from "react";
import { PokemonApi } from "@/service";

const usePokemon = () => {
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await PokemonApi.getPokemonList();
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
