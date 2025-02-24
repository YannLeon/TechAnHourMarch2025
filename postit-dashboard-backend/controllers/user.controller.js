import {
  checkUserPassword,
  registerUser as _registerUser,
} from "../services/user.service.js";

export const loginUser = async (req, res) => {
  try {
    const { name, password } = req.body;

    if (!name || !password) {
      return res.status(400).json({ error: "Name and password are required" });
    }

    const user = await checkUserPassword(name, password);
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ error: error.message });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { name, password } = req.body;

    if (typeof name !== "string" || typeof password !== "string") {
      return res.status(400).json({ error: "Invalid input data" });
    }

    if (!name || !password) {
      return res.status(400).json({ error: "Name and password are required" });
    }

    const user = await _registerUser(name, password);
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};
