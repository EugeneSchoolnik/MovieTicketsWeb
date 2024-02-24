import { Router } from "express";
import { deleteMovie, editMovie } from "../controllers/admin";

const adminRoute = Router();

adminRoute.post("/edit", editMovie);

adminRoute.post("/delete", deleteMovie);

export default adminRoute;
