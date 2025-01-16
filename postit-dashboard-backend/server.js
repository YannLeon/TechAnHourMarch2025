import express, { json } from "express";
import { query } from "./db.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(json());

const PORT = process.env.PORT || 3000;

// Routes
app.get("/postits", async (req, res) => {
  const result = await query("SELECT * FROM post_its ORDER BY created_at DESC");
  res.json(result.rows);
});

app.post("/postits", async (req, res) => {
  const { content, name } = req.body;
  const result = await query(
    "INSERT INTO post_its (content, name, created_at) VALUES ($1, $2, NOW()) RETURNING *",
    [content, name]
  );
  res.json(result.rows[0]);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
