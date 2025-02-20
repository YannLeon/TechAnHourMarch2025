import { query } from "../db.js";

export const getAllPostIts = async () => {
  const result = await query("SELECT * FROM post_its ORDER BY created_at DESC");
  return result.rows;
};

export const createPostIt = async (content, user_id) => {
  const result = await query(
    "INSERT INTO post_its (content,user_id, created_at) VALUES ($1, $2, NOW()) RETURNING *",
    [content, user_id]
  );
  return result.rows[0];
};
