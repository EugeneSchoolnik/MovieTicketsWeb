import { Router } from "express";
import { getAllMovies, getCurrentMovies, newMovie } from "../controllers/movies";

const moviesRoute = Router();

moviesRoute.post("/new", newMovie);

moviesRoute.get("/current", getCurrentMovies);

moviesRoute.get("/all", getAllMovies);

export default moviesRoute;
