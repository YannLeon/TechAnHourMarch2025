import { query } from "../db.js";

export const getUser = async (name) => {
  const result = await query("SELECT * FROM users WHERE name = $1", [name]);

  return result.rows[0] ?? null;
};

export const getUserFromId = async (id) => {
  const result = await query("SELECT * FROM users WHERE id = $1", [id]);

  return result.rows[0] ?? null;
};

export const createUser = async (name, password) => {
  const result = await db.query(
    `INSERT INTO users (name, password) 
       VALUES ($1, $2) RETURNING *`,
    [name, password] // ⚠️ Passwords should be hashed in a real application
  );

  return result.rows[0];
};
