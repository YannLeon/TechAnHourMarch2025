import {
  getPostIts as _getPostIts,
  addPostIt as _addPostIt,
} from "../services/postit.service.js";

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
