import { Router } from "express";
import { auth, getMe, login, logout, register } from "../controllers/auth";

const authRoute = Router();

authRoute.post("/login", login);

authRoute.post("/register", register);

authRoute.get("/me", auth, getMe);

authRoute.get("/logout", logout);

export default authRoute;
