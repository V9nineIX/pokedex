import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface UserState {
  users: any[];
  isLoadingUsers: boolean;
  pagination: PaginationMeta | null;
  currentPage: number;
  itemsPerPage: number;
  searchQuery: string;
}

const initialState: UserState = {
  users: [],
  isLoadingUsers: false,
  pagination: null,
  currentPage: 1,
  itemsPerPage: 10,
  searchQuery: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<any[]>) => {
      state.users = action.payload;
      state.isLoadingUsers = false;
    },
    setUsersWithPagination: (
      state,
      action: PayloadAction<{ users: any[]; pagination: PaginationMeta }>
    ) => {
      state.users = action.payload.users;
      state.pagination = action.payload.pagination;
      state.isLoadingUsers = false;
    },
    setUserField: (
      state,
      action: PayloadAction<{ key: keyof UserState; value: any }>
    ) => {
      const { key, value } = action.payload;
      (state as any)[key] = value;
    },
  },
});

export const { setUsers, setUsersWithPagination, setUserField } =
  userSlice.actions;

export default userSlice.reducer;
