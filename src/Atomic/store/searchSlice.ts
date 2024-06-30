import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface SearchState {
  title: string;
  page: string;
  genres: string;
  years: string;
  btnGanre: string;
  btnYear: string;
}

const initialState: SearchState = {
  title: "",
  page: "1",
  genres: "",
  years: "",
  btnGanre: "Выберите жанр",
  btnYear: "Выберите год",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
      state.page = "1";
    },
    setPage(state, action: PayloadAction<string>) {
      state.page = action.payload;
    },
    setGenres(state, action: PayloadAction<string>) {
      state.genres = action.payload;
      state.page = "1";
    },
    setYears(state, action: PayloadAction<string>) {
      state.years = action.payload;
      state.page = "1";
    },
    setBtnGanre(state, action: PayloadAction<string>) {
      state.btnGanre = action.payload;
    },
    setBtnYear(state, action: PayloadAction<string>) {
      state.btnYear = action.payload;
    },
  },
});

export const {
  setTitle,
  setPage,
  setGenres,
  setYears,
  setBtnGanre,
  setBtnYear,
} = searchSlice.actions;

export default searchSlice.reducer;
