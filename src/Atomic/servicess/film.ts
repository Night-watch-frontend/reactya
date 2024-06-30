import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type Film = {
  id: string;
  title: string;
  poster: string;
  rating?: number;
  release_year: string;
  genre: string;
  description: string;
  total_rates_count: string;
  actors: { photo: string; name: string }[];
};

type Films = {
  search_result: {
    id: string;
    title: string;
    poster: string;
    rating?: number;
    release_year: string;
    genre: string;
    description: string;
    total_rates_count: string;
  }[];
  total_pages: number;
};

type User = {
  username: string;
  password: string;
};

export const filmApi = createApi({
  reducerPath: "filmApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3030" }),
  endpoints: (build) => ({
    postUser: build.mutation({
      query: (data: User) => ({
        url: "/api/v1/login",
        method: "POST",
        body: data,
      }),
    }),
    getFilm: build.query<Film, string>({
      query: (id) => ({ url: `/api/v1/movie/${id}` }),
    }),
    getFilms: build.query<
      Films,
      {
        page?: string;
        title?: string;
        genres?: string;
        years?: string;
      }
    >({
      query: ({ page, title, genres, years }) => ({
        url: `/api/v1/search?${page && `page=${page}`}&${
          title && `title=${title}`
        }&${genres && `genre=${genres}`}&${years && `release_year=${years}`}`,
      }),
    }),
  }),
});
