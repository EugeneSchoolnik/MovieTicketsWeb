import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import { join } from "path";
import authRoute from "./src/routes/auth";
import moviesRoute from "./src/routes/movies";
import adminRoute from "./src/routes/admin";
import ordersRoute from "./src/routes/orders";
import userRoute from "./src/routes/user";

dotenv.config();

const app = express();
const port = 3000;

app.use(
  cors({
    origin: process.env.CLIENT_HOST,
    credentials: true,
  })
);
app.use(express.json());
app.use(fileUpload());
app.use(express.static(join(__dirname, "public")));
app.use(cookieParser());

app.use("/auth", authRoute);
app.use("/movies", moviesRoute);
app.use("/admin", adminRoute);
app.use("/orders", ordersRoute);
app.use("/user", userRoute);

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});
