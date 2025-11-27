import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PokemonDetail } from "@/types";

interface PokemonState {
  pokemonList: PokemonDetail[];
  isLoadingPokemonList: boolean;
  currentPage: number;
  itemsPerPage: number;
  searchQuery: string;
}

const initialState: PokemonState = {
  pokemonList: [],
  isLoadingPokemonList: false,
  currentPage: 1,
  itemsPerPage: 20,
  searchQuery: "",
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setPokemonList: (
      state,
      action: PayloadAction<{
        pokemonList: PokemonDetail[];
        currentPage: number;
      }>
    ) => {
      const { pokemonList, currentPage } = action.payload;
      state.pokemonList = pokemonList;
      state.isLoadingPokemonList = false;
      state.currentPage = currentPage;
    },
    setPokemonField: (
      state,
      action: PayloadAction<{ key: keyof PokemonState; value: any }>
    ) => {
      const { key, value } = action.payload;
      (state as any)[key] = value;
    },
  },
});

export const { setPokemonList, setPokemonField } = pokemonSlice.actions;
export default pokemonSlice.reducer;
