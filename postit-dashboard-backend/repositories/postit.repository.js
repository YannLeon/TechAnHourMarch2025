import { query } from "../db";

const getAllPostIts = async () => {
  const result = await query("SELECT * FROM post_its ORDER BY created_at DESC");
  return result.rows;
};

const createPostIt = async (content, name) => {
  const result = await query(
    "INSERT INTO post_its (content, name, created_at) VALUES ($1, $2, NOW()) RETURNING *",
    [content, name]
  );
  return result.rows[0];
};

export default {
  getAllPostIts,
  createPostIt,
};
