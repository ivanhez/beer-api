import express from "express";
import { getAllRows } from "./db.js";

const app = express();
const port = 5000;

app.get("/", async (req, res) => {
  const allRows = await getAllRows();
  res.send("GET ALL ROWS", allRows);
});

app.listen(port, () => {
  console.log(`Server listening at http://127.0.0.1:${port}`);
});
