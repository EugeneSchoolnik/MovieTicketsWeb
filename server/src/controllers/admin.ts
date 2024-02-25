import { Handler } from "../utils/resp";
import db from "../db";
import { resp } from "../utils/resp";
import { extname, join } from "path";
import { checkIntersection } from "./movies";

export const editMovie: Handler = async (req, res) => {
  const { title, genres, storyline, price, time, date, duration, period } = req.body;
  const id = req.query.id;

  const intersection = await checkIntersection(time, duration, date, period, id as string);
  if (intersection.length)
    return res.status(409).json(
      resp(
        false,
        intersection.map(i => i.title)
      )
    );

  if (req.files && req.files.banner) {
    const fileName = Date.now() + extname(req.files.banner.name);
    req.files.banner.mv(join("public", fileName));
  }

  let movie: any = await db.execute(
    "UPDATE movies SET title = ?, genres = ?, storyline = ?, price = ?, time = ?, date = ?, duration = ?, period = ? WHERE id = ?",
    [title, genres, storyline, price, time, date, duration, period, id]
  );

  if (movie[0] && movie[0].affectedRows == 0) return res.status(500).json(resp(false, "Error when updating a user"));

  movie = (await db.execute("SELECT * FROM movies WHERE id = ?", [id]))[0][0];
  res.json(resp(true, movie));
};

export const deleteMovie: Handler = async (req, res) => {
  await db.query("DELETE FROM movies WHERE id = ?", [req.query.id]);
  res.send();
};
