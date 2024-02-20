import { Response } from "express";
import uniqid from "uniqid";
import { compareSync, hashSync } from "bcryptjs";
import { Handler } from "../utils/resp";
import db from "../db";
import { resp } from "../utils/resp";
import { checkToken, genToken } from "../utils/authToken";

function setToken(data: any[], res: Response) {
  res.cookie("authorization", genToken(data, "7d"), { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
}
// LOGIN
export const login: Handler = async (req, res) => {
  const { email, password } = req.body;

  const [user]: any = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
  if (!user.length) return res.status(404).json(resp(false, "There is no account with this mail"));

  const [userId, hash] = [user[0].id, user[0].password];
  if (!compareSync(password, hash)) return res.status(401).json(resp(false, "Incorrect password"));

  setToken([userId, hash], res);
  res.json(resp(true, { userId, email }));
};
// REGISTER
export const register: Handler = async (req, res) => {
  const { email, password } = req.body;

  const [exist]: any = await db.execute("SELECT 1 FROM users WHERE email = ?", [email]);
  if (exist.length) return res.status(409).json(resp(false, "Email is already in use"));

  const userId = uniqid.time();
  const hash = hashSync(password, 8);
  const user: any = await db.execute("INSERT INTO users (id, email, password) VALUES (?, ?, ?)", [userId, email, hash]);

  if (user[0] && user[0].affectedRows !== 1) return res.status(500).json(resp(false, "Error when adding a user"));

  setToken([userId, hash], res);
  res.json(resp(true, { userId, email }));
};
// GET USER DATA
export const getMe: Handler = async (req, res) => {
  const user = (await db.execute("SELECT * FROM users WHERE id = ?", [req.userId]))[0][0];
  const { email } = user;

  res.json(resp(true, { userId: req.userId, email }));
};
// AUTH
export const auth: Handler = async (req, res, next) => {
  try {
    const authorization = req.cookies.authorization;
    if (!authorization) return res.status(401).json(resp(false, "Not authorized"));

    const { data, expired } = checkToken(authorization);
    if (expired) return res.status(401).json(resp(false, "The token expired"));

    const hash = (await db.execute("SELECT password FROM users WHERE id = ?", [data[0]]))[0][0].password;
    if (hash !== data[1]) res.status(401).json(resp(false, "Incorrect token"));

    req.userId = data[0];
    next();
  } catch {
    res.status(401).json(resp(false, "Something went wrong"));
  }
};
