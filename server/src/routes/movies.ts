import { Router } from "express";
import { getCurrentMovies, newMovie } from "../controllers/movies";

const moviesRoute = Router();

moviesRoute.post("/new", newMovie);

moviesRoute.get("/current", getCurrentMovies);

export default moviesRoute;
