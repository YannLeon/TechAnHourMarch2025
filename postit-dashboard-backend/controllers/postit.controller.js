const postitService = require("../services/postit.service");

const getPostIts = async (req, res) => {
  try {
    const postIts = await postitService.getPostIts();
    res.json(postIts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addPostIt = async (req, res) => {
  try {
    const { content, name } = req.body;
    const newPostIt = await postitService.addPostIt(content, name);
    res.status(201).json(newPostIt);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getPostIts,
  addPostIt,
};
