import { Router } from "express";
import { auth } from "../controllers/auth";
import { chacngePass, restorePass } from "../controllers/user";

const userRoute = Router();

userRoute.post("/changepass", auth, chacngePass);

userRoute.post("/restorepass", restorePass);

export default userRoute;
