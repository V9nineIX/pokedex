import { useState, useEffect } from "react";
import { fetchPokemonFullDetail } from "@/service/poke.api";
import useDispatch from "react-redux";
// import { setPokemonDetail } from '@/store/slices/pokemon';

const usePokemonDetail = () => {
  const fetchPokemonDetail = async (stringOrId: string | number) => {
    try {
      // dispatch(setPokemonField({ key: "isLoadingPokemonDetail", value: true }));
      const data = await fetchPokemonFullDetail(stringOrId);
      return data;
      // dispatch(setPokemonField({ key: "pokemonDetail", value: data }));
    } catch (error) {
      console.error("Error fetching Pokemon detail:", error);
      // dispatch(setPokemonField({ key: "isLoadingPokemonDetail", value: false }));
    }
  };

  // useEffect(() => {
  //   fetchPokemonDetail();
  // }, []);
  return { fetchPokemonDetail };
};

export default usePokemonDetail;
