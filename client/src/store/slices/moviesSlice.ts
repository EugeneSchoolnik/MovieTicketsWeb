import { createSlice } from "../core";

export type movie = {
  id: string;
  title: string;
  genres: string;
  storyline: string;
  price: number;
  time: string;
  date: string;
  duration: number;
  period: number;
  banner: string;
};

export interface Movies {
  movies: movie[];
  admin: movie[];
}

const parseTime = (time: string) =>
  time.split(":").reduce((acc, i, ind) => acc + Number(i) * 60 * 1000 * (ind ? 1 : 60), 0);

const state: Movies = {
  movies: [],
  admin: [],
};

const moviesSlice = createSlice<Movies>({
  name: "movies",
  state,
  reducers: {
    set(s, p: movie[]) {
      s.movies = p.filter(i => {
        const date = new Date();
        const time = parseTime(date.getHours() + ":" + date.getMinutes());
        return parseTime(i.time) > time;
      });
    },
    checkExpired(s) {
      s.movies = s.movies.filter(i => {
        const date = new Date();
        const time = parseTime(date.getHours() + ":" + date.getMinutes());
        return time + 15 * 60 * 1000 < parseTime(i.time);
      });
    },
    setAdmin(s, p) {
      s.admin = p;
    },
  },
});

export default moviesSlice;
