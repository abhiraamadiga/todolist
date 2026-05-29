import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FilterState {
  search: string;
  filter: string;
}

const initialState: FilterState = {
  search: "",
  filter: "all",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
  },
});

export const { setSearch, setFilter } = filterSlice.actions;

export default filterSlice.reducer;
