import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PokemonDetail } from "@/types";

interface PokemonState {
  pokemonList: PokemonDetail[];
  isLoadingPokemonList: boolean;
  currentPage: number;
  itemsPerPage: number;
  searchQuery: string;
  totalCount: number;
  isFilterOpen: boolean;
  selectedTypes: string[];
  next: string | null;
}

const initialState: PokemonState = {
  pokemonList: [],
  isLoadingPokemonList: false,
  currentPage: 1,
  itemsPerPage: 20,
  searchQuery: "",
  totalCount: 0,
  selectedTypes: [],
  isFilterOpen: false,
  next: null,
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
        totalCount: number;
        next: string | null;
      }>
    ) => {
      const { pokemonList, currentPage, totalCount, next } = action.payload;
      state.pokemonList = pokemonList;
      state.isLoadingPokemonList = false;
      state.currentPage = currentPage;
      state.totalCount = totalCount;
      state.next = next;
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
