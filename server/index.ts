import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoute from "./src/routes/auth";

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
app.use(cookieParser());

app.use("/auth", authRoute);

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});
