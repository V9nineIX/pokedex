import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PokemonDetail } from "@/types";
import { LIMIT_PER_PAGE } from "@/constant";

interface PokemonState {
  pokemonList: PokemonDetail[];
  isLoadingPokemonList: boolean;
  currentPage: number;
  itemsPerPage: number;
  searchQuery: string;
  searchTerm: string;
  isSearchActive: boolean;
  totalCount: number;
  isFilterOpen: boolean;
  selectedTypes: string[];
  next: string | null;
  pokemonDetail: PokemonDetail | null;
  isLoadingPokemonDetail: boolean;
}

const initialState: PokemonState = {
  pokemonList: [],
  isLoadingPokemonList: false,
  currentPage: 1,
  itemsPerPage: LIMIT_PER_PAGE,
  searchQuery: "",
  searchTerm: "",
  isSearchActive: false,
  totalCount: 0,
  selectedTypes: [],
  isFilterOpen: true,
  next: null,
  pokemonDetail: null,
  isLoadingPokemonDetail: true,
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
    setPokemonDetail: (
      state,
      action: PayloadAction<{ pokemonDetail: PokemonDetail }>
    ) => {
      const { pokemonDetail } = action.payload;
      state.pokemonDetail = pokemonDetail;
      state.isLoadingPokemonDetail = false;
    },
  },
});

export const { setPokemonList, setPokemonField, setPokemonDetail } =
  pokemonSlice.actions;
export default pokemonSlice.reducer;
