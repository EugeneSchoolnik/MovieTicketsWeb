import uniqid from "uniqid";
import qr from "qrcode";
import { Handler } from "../utils/resp";
import db from "../db";
import { resp } from "../utils/resp";

export const newOrder: Handler = async (req, res) => {
  const { movieId } = req.body;
  const id = uniqid.time();

  let [order]: any = await db.execute("INSERT INTO orders (id, userId, movieId, date) VALUES (?,?,?,NOW())", [
    id,
    req.userId,
    movieId,
  ]);

  if (order && order.affectedRows !== 1) return res.status(500).json(resp(false, "Error when creating order"));

  try {
    order = (
      await db.execute(
        "SELECT orders.id, DATE_FORMAT(orders.date, '%Y-%m-%d') AS date, movies.time, movies.title, movies.duration FROM orders INNER JOIN movies ON orders.movieId = movies.id WHERE orders.id = ?",
        [id]
      )
    )[0][0];

    order.isActive = isActive(order.date, order.time);
    res.json(resp(true, order));
  } catch (e) {
    res.json(resp(false, "Something went wrong"));
  }
};

export const getOrders: Handler = async (req, res) => {
  try {
    const [orders] = await db.execute(
      "SELECT orders.id, DATE_FORMAT(orders.date, '%Y-%m-%d') AS date, movies.time, movies.title, movies.duration FROM orders INNER JOIN movies ON orders.movieId = movies.id WHERE orders.userId = ?",
      [req.userId]
    );

    (orders as any[]).forEach(i => (i.isActive = isActive(i.date, i.time)));
    res.json(resp(true, orders));
  } catch (e) {
    res.json(resp(false, "Something went wrong"));
  }
};

export const checkOrder: Handler = async (req, res) => {
  const id = req.params.id;
  try {
    const order = (
      await db.execute(
        "SELECT DATE_FORMAT(orders.date, '%Y-%m-%d') AS date, movies.time FROM orders INNER JOIN movies ON orders.movieId = movies.id WHERE orders.id = ?",
        [id]
      )
    )[0][0];

    const active = isActive(order.date, order.time);
    res.json(resp(true, { active }));
  } catch (e) {
    res.json(resp(false, "Something went wrong"));
  }
};

export const qrcode: Handler = (req, res) => {
  const url = req.query.url as string | undefined;

  if (!url) return res.send();

  qr.toDataURL(url, async (err, data) => {
    if (err) {
      res.status(500).send("Error while generating qrcode");
    } else {
      const qrCodeBuffer = await qr.toBuffer(url);
      res.set("Content-Type", "image/png");
      res.send(qrCodeBuffer);
    }
  });
};

const isActive = (dateStr: string, timeStr: string) => {
  const date = new Date(dateStr);
  const [hours, minutes] = timeStr.split(":");
  date.setHours(Number(hours));
  date.setMinutes(Number(minutes));

  return new Date() < date;
};
