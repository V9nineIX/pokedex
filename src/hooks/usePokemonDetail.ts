import { useState, useEffect } from "react";
import { fetchPokemonFullDetail } from "@/service/poke.api";
import { useDispatch, useSelector } from "react-redux";
import { setPokemonDetail, setPokemonField } from "@/store/slices/pokemon";

const usePokemonDetail = () => {
  const dispatch = useDispatch();
  const pokemonDetailState = useSelector((state: any) => state.pokemon);
  const fetchPokemonDetail = async (stringOrId: string | number) => {
    try {
      dispatch(setPokemonField({ key: "isLoadingPokemonDetail", value: true }));
      const data = await fetchPokemonFullDetail(stringOrId);
      dispatch(setPokemonDetail({ pokemonDetail: data }));
    } catch (error) {
      console.error("Error fetching Pokemon detail:", error);
      dispatch(
        setPokemonField({ key: "isLoadingPokemonDetail", value: false })
      );
    }
  };

  return { fetchPokemonDetail, pokemonDetailState };
};

export default usePokemonDetail;
