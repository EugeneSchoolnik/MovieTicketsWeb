import { Router } from "express";
import { auth, getMe, login, register } from "../controllers/auth";

const authRoute = Router();

authRoute.post("/login", login);

authRoute.post("/register", register);

authRoute.get("/me", auth, getMe);

export default authRoute;
