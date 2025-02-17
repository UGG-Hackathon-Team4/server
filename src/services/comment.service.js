import { AlreadyExistError, NotFoundError } from "../error.js";
import { getArtworkByID } from "../repositories/artwork.repository.js";
import {
  addComment,
  getCommentById,
  getCommentFk,
  getCommentsByLikes,
  getCommentsByTime,
  likeComment,
} from "../repositories/comment.repository.js";
import { getUserById } from "../repositories/user.repository.js";

export const commentAdd = async (data) => {
  const user = await getUserById(data.userId);

  if (!user) {
    throw new NotFoundError("존재하지 않는 유저입니다");
  }

  const artwork = await getArtworkByID(data.artworkId);
  if (!artwork) {
    throw new NotFoundError("존재하지 않는 작품입니다");
  }

  const comment = await getCommentFk(data.userId, data.artworkId);

  if (comment) {
    throw new AlreadyExistError("이미 코멘트를 작성하셨습니다");
  }

  await addComment({
    //방문기록
    userId: data.userId,
    artworkId: data.artworkId,
    description: data.description,
  });

  return { data };
};

export const commentLike = async (data) => {
  const user = await getUserById(data.userId);

  if (!user) {
    throw new NotFoundError("존재하지 않는 유저입니다", data.userId);
  }

  const comment = await getCommentById(data.commentId);

  if (!comment) {
    throw new NotFoundError("존재하지 않는 코멘트입니다", data.commentId);
  }

  return await likeComment({
    userId: data.userId,
    commentId: data.commentId,
  });
};
export const getCommentByLike = async () => {
  return await getCommentsByLikes();
};
export const getCommentByTime = async () => {
  return await getCommentsByTime();
};
