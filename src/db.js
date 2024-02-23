import conn from "./conn.js";

export async function getAllRows() {
  const [rows] = await conn.query("SELECT * FROM tbl_beer");
  return rows;
}