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
  console.log(`🔹 Creating user in DB: ${name}`);

  try {
    const result = await query(
      `INSERT INTO users (name, password) 
       VALUES ($1, $2) RETURNING *`,
      [name, password]
    );

    console.log("✅ User inserted in DB:", result.rows[0]);

    return result.rows[0];
  } catch (err) {
    console.error("❌ Database insert error:", err.message);
    throw new Error(`Database error: ${err.message}`);
  }
};
