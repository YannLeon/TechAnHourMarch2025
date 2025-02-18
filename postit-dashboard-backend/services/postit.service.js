import {
  createPostIt,
  getAllPostIts,
} from "../repositories/postit.repository.js";

export const getPostIts = async () => await getAllPostIts();

export const addPostIt = (content, name) => createPostIt(content, name);
