import {
  createUser as _createUser,
  getUser,
  getUserFromId,
} from "../repositories/user.repository.js";
import HttpError from "../utils/HttpError.js";

export const checkUserPassword = async (name, password) => {
  const user = await getUser(name);

  if (!user) {
    throw new HttpError("User not found", 404);
  }

  // ⚠️ SECURITY WARNING: Passwords should be hashed in a real application
  if (user.password !== password) {
    throw new HttpError("Incorrect password", 401);
  }

  return { id: user.id, role: user.role };
};

export const getUserNameFromId = async (id) => {
  const user = await getUserFromId(id);

  if (!user) {
    throw new HttpError("User not found", 404);
  }
  return user.name;
};

export const getUserRoleFromId = async (id) => {
  const user = await getUserFromId(id);

  if (!user) {
    throw new HttpError("User not found", 404);
  }
  return user.role;
};

export const registerUser = async (name, password) => {
  // Check if user already exists
  const existingUser = await getUser(name);
  if (existingUser) {
    throw new HttpError("User already exists", 400);
  }

  // Create a new user
  const newUser = await _createUser(name, password);

  return { id: newUser.id, role: newUser.role };
};
