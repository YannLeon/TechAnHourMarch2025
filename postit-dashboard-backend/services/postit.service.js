import {
  createPostIt,
  getAllPostIts,
} from "../repositories/postit.repository.js";
import { getUserNameFromId } from "./user.service.js";

export const getPostIts = async () => {
  const postits = await getAllPostIts();
  console.log("🔹 All raw post-its:", postits);

  // Wait for all user name retrievals to complete
  const enrichedPostIts = await Promise.all(
    postits.map(async (p) => {
      const name = await getUserNameFromId(p.user_id);
      return { ...p, name };
    })
  );

  console.log("✅ Post-its with user names:", enrichedPostIts);
  return enrichedPostIts;
};

export const addPostIt = (content, userId) => createPostIt(content, userId);
