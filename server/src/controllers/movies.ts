import uniqid from "uniqid";
import { Handler } from "../utils/resp";
import db from "../db";
import { resp } from "../utils/resp";
import { extname, join } from "path";

export const newMovie: Handler = async (req, res) => {
  const { title, genres, storyline, price, time, date, duration, period } = req.body;
  const { banner } = req.files;
  const id = uniqid.time();

  const intersection = await checkIntersection(time, duration, date, period);

  if (intersection.length)
    return res.status(409).json(
      resp(
        false,
        intersection.map(i => i.title)
      )
    );

  const fileName = Date.now() + extname(banner.name);
  banner.mv(join("public", fileName));

  let movie: any = await db.execute(
    "INSERT INTO movies (id, title, genres, storyline, price, time, date, duration, period, banner) VALUES (?,?,?,?,?,?,?,?,?,?)",
    [id, title, genres, storyline, price, time, date, duration, period, fileName]
  );

  if (movie[0] && movie[0].affectedRows !== 1) return res.status(500).json(resp(false, "Error when adding a user"));

  movie = (await db.execute("SELECT * FROM movies WHERE id = ?", [id]))[0][0];
  res.json(resp(true, movie));
};

export const getCurrentMovies: Handler = async (req, res) => {
  let movies = (await getMovies()) as any[];
  const expired = movies.filter(i => {
    const end = Date.parse(i.date) + i.period * 24 * 60 * 60 * 1000 + parseTime(i.time);
    return end - 15 * 60 * 1000 <= Date.now();
  });
  if (expired.length) {
    const idArr = expired.map(i => i.id);
    db.query(`DELETE FROM movies WHERE id IN ('${idArr.join("','")}')`);
    movies = movies.filter(i => !idArr.includes(i.id));
  }
  const date = Date.parse(new Date().toISOString().split("T")[0]);
  movies = movies.filter(i => Date.parse(i.date) <= date); // filter future

  res.json(resp(true, movies));
};

export const getAllMovies: Handler = async (req, res) => res.json(resp(true, await getMovies()));

const getMovies = async () => {
  return (await db.query("SELECT * FROM movies"))[0] as any;
};

const parseTime = (time: string) =>
  time.split(":").reduce((acc, i, ind) => acc + Number(i) * 60 * 1000 * (ind ? 1 : 60), 0);

export const checkIntersection = async (
  timeStr: string,
  duration: number,
  dateStr: string,
  period: number,
  updateId?: string
) => {
  const date = Date.parse(dateStr);
  const endDate = date + period * 24 * 60 * 60 * 1000;
  const time = parseTime(timeStr);
  const endTime = time + duration * 60 * 1000;

  const movies = (await getMovies()) as any[];
  movies.forEach(i => ((i.date = Date.parse(i.date)), (i.time = parseTime(i.time))));

  const intersection = movies.filter(i => {
    if (i.id == updateId) return false;
    let start = Math.max(date, i.date);
    let end = Math.min(endDate, i.date + i.period * 24 * 60 * 60 * 1000);

    if (start > end) return false;

    start = Math.max(time, i.time);
    end = Math.min(endTime, i.time + i.duration * 60 * 1000);

    return start <= end;
  });

  return intersection;
};
