import {
  createPostIt,
  getAllPostIts,
} from "../repositories/postit.repository.js";

export const getPostIts = () => getAllPostIts;

export const addPostIt = (content, name) => createPostIt(content, name);
