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
    const { content, name } = req.body;
    const newPostIt = await _addPostIt(content, name);
    res.status(201).json(newPostIt);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
