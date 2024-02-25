import { compareSync, hashSync } from "bcryptjs";
import dotenv from "dotenv";
import { Handler } from "../utils/resp";
import db from "../db";
import { resp } from "../utils/resp";
import { setToken } from "./auth";
import mail from "../mail";

dotenv.config();

export const chacngePass: Handler = async (req, res) => {
  try {
    const { old, password } = req.body;

    let hash = (await db.execute("SELECT password FROM users WHERE id = ?", [req.userId]))[0][0].password;
    if (!compareSync(old, hash)) return res.status(401).json(resp(false, "Incorrect old password"));

    hash = hashSync(password, 8);
    const [result]: any = await db.execute("UPDATE users SET password = ? WHERE id = ?", [hash, req.userId]);

    if (result && result.affectedRows == 0) return res.status(500).json(resp(false, "Error when updating a password"));

    setToken([req.userId, hash], res);
    res.json(resp(true, "Password has been changed"));
  } catch (e) {
    console.log(e);
    res.json(resp(false, "Something went wrong"));
  }
};

export const restorePass: Handler = async (req, res) => {
  const { email, token_, password } = req.body;

  const [user]: any = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
  if (!user.length) return res.status(404).json(resp(false, "User not found"));

  if (token_ && password) {
    if (!compareSync(user[0].password, token_)) return res.status(401).json(resp(false, "Invalid token"));

    const newHash = hashSync(password, 8);
    const [result]: any = await db.execute("UPDATE users SET password = ? WHERE email = ?", [newHash, email]);

    if (result && result.affectedRows == 0) return res.status(500).json(resp(false, "Error when restore a password"));

    setToken([user[0].id, newHash], res);
    return res.json(resp(true, { userId: user[0].id, email }));
  }

  const token = hashSync(user[0].password, 8);
  const link = `${process.env.CLIENT_HOST}/restorepass?token=${token}&email=${email}`;

  mail
    .sendMail({
      from: process.env.MAIL,
      to: email,
      subject: "Password Restore",
      html: `<a href="${link}">${link}</a>`,
    })
    .then(() => res.json(resp(true, "The message has been sent")))
    .catch(e => {
      console.log(e);
      res.status(500).json(resp(false, "Something went wrong"));
    });
};
