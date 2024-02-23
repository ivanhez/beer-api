import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "beer",
  database: "beer_db",
  password: "password",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
