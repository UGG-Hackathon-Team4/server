import { prisma } from "../db.config.js";
import { AlreadyExistError, NotFoundError } from "../error.js";

export const addComment = async (data) => {
  await prisma.comment.create({ data: data });
};

export const getCommentFk = async (userId, artworkId) => {
  const comment = await prisma.comment.findFirst({
    where: { artworkId: artworkId, userId: userId },
  });

  return comment;
};

export const getCommentById = async (commentId) => {
  const comment = await prisma.comment.findFirst({ where: { id: commentId } });

  return comment;
};

export const likeComment = async (data) => {
  // 이미 좋아요를 눌렀는지 확인
  const like = await prisma.like.findFirst({
    where: { commentId: data.commentId, userId: data.userId },
  });

  if (like) {
    throw new AlreadyExistError("이미 좋아요를 누르셨습니다");
  }

  await prisma.like.create({
    data: {
      userId: data.userId,
      commentId: data.commentId,
    },
  });

  const count = await prisma.like.count({
    where: { commentId: data.commentId },
  });

  return { message: "좋아요를 눌렀습니다!", count };
};
export const getCommentsByLikes = async () => {
  const comments = await prisma.comment.findMany({
    include: {
      user: true,
      artwork: true,
      _count: {
        select: { likes: true },
      },
    },
    orderBy: {
      likes: {
        _count: "desc",
      },
    },
  });

  return comments;
};
export const getCommentsByTime = async () => {
  const comments = await prisma.comment.findMany({
    include: {
      user: true,
      artwork: true,
      _count: {
        select: { likes: true },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return comments;
};
