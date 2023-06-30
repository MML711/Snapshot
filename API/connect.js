import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const devConfig = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
};

const proConfig = process.env.MYSQL_DATABASE_URL; // Deployment MYSQL_DATABASE_URL

export const db = mysql.createConnection(
  process.env.NODE_ENV === "production"
    ? proConfig
    : devConfig
);
