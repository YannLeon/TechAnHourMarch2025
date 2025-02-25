import {
  createPostIt,
  deletePostIt,
  getAllPostIts,
  getPostItById,
} from "../repositories/postit.repository.js";
import HttpError from "../utils/HttpError.js";
import { getUserNameFromId, getUserRoleFromId } from "./user.service.js";

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

export const removePostIt = async (postId, userId) => {
  // Retrieve the post-it to check ownership
  const postIt = await getPostItById(postId);

  if (!postIt) {
    throw new HttpError("Post-it not found", 404);
  }

  const userRole = await getUserRoleFromId(userId);

  // Check if the user deleting is the owner
  if (postIt.user_id !== userId && userRole !== "admin") {
    throw new HttpError(
      "Unauthorized: You can only delete your own post-its",
      401
    );
  }

  // Proceed with deletion
  await deletePostIt(postId);
  return { message: "Post-it deleted successfully" };
};
