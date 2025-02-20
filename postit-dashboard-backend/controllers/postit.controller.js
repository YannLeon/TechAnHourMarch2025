import {
  getPostIts as _getPostIts,
  addPostIt as _addPostIt,
  removePostIt as _removePostIt,
} from "../services/postit.service.js";
import HttpError from "../utils/HttpError.js";

export const getPostIts = async (req, res) => {
  try {
    const postIts = await _getPostIts();
    res.json(postIts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addPostIt = async (req, res) => {
  try {
    const { content, user_id } = req.body;
    const newPostIt = await _addPostIt(content, user_id);
    res.status(201).json(newPostIt);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deletePostIt = async (req, res) => {
  try {
    const { id } = req.params; // Post-it ID from URL
    const { user_id } = req.body; // User ID from request body

    if (!id || !user_id) {
      throw new HttpError("Post-it ID and user ID are required", 400);
    }

    const result = await _removePostIt(Number(id), Number(user_id));
    res.status(200).json(result);
  } catch (error) {
    console.error("Error deleting post-it:", error.message);
    const statusCode = error instanceof HttpError ? error.statusCode : 500;
    res.status(statusCode).json({ error: error.message });
  }
};
