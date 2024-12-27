import { addComment, likeComment } from "../repositories/comment.repository.js";

export const commentAdd = async (data) => {
  await addComment({
    userId: data.userId,
    artworkId: data.artworkId,
    description: data.description,
  });

  return { data };
};

export const commentLike = async (data) => {
  return await likeComment({
    userId: data.userId,
    commentId: data.commentId,
  });
};
