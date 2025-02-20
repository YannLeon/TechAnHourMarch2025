import {
  createPostIt,
  getAllPostIts,
} from "../repositories/postit.repository.js";
import { getUserNameFromId } from "./user.service.js";

export const getPostIts = async () => {
  const postits = await getAllPostIts();

  // Wait for all user name retrievals to complete
  const enrichedPostIts = await Promise.all(
    postits.map(async (p) => {
      const name = await getUserNameFromId(p.user_id);
      return { ...p, name };
    })
  );
  return enrichedPostIts;
};

export const addPostIt = async (content, user_id) => {
  await createPostIt(content, user_id);
};
