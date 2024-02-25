import { Router } from "express";
import { checkOrder, getOrders, newOrder, qrcode } from "../controllers/orders";
import { auth } from "../controllers/auth";

const ordersRoute = Router();

ordersRoute.post("/new", auth, newOrder);

ordersRoute.get("/get", auth, getOrders);

ordersRoute.get("/check/:id", checkOrder);

ordersRoute.get("/qrcode", qrcode);

export default ordersRoute;
