import { addComment } from "../repositories/comment.repository.js";

export const commentAdd = async (data) => {
  await addComment({
    userId: data.userId,
    artworkId: data.artworkId,
    description: data.description,
  });

  return { data };
};
