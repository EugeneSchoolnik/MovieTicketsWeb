import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export default db;

/*
table users
CREATE TABLE `users` (
  `id` varchar(8) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);
COMMIT;

table movies
CREATE TABLE `movies` (
  `id` varchar(8) NOT NULL,
  `title` varchar(32) NOT NULL,
  `genres` varchar(64) NOT NULL,
  `storyline` text NOT NULL,
  `price` float NOT NULL,
  `time` varchar(5) NOT NULL,
  `date` varchar(10) NOT NULL,
  `duration` int NOT NULL,
  `period` int NOT NULL,
  `banner` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

*/
