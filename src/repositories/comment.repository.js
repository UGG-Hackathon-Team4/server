import { prisma } from "../db.config.js";

export const addComment = async (data) => {
  const user = await prisma.user.findFirst({ where: { id: data.userId } });

  if (!user) {
    throw new Error("존재하지 않는 유저입니다");
  }

  const artwork = await prisma.artwork.findFirst({
    where: { id: data.artworkId },
  });

  if (!artwork) {
    throw new Error("존재하지 않는 작품입니다");
  }

  const comment = await prisma.comment.findFirst({
    where: { artworkId: data.artworkId, userId: data.userId },
  });

  if (comment) {
    throw new Error("이미 코멘트를 작성하셨습니다");
  }

  await prisma.comment.create({ data: data });
};

export const getCommentById = async (commentId) => {
  const comment = await prisma.comment.findFirst({ where: { id: commentId } });

  return comment;
};

export const likeComment = async (data) => {
  console.log(data);
  const user = await prisma.user.findFirst({ where: { id: data.userId } });

  if (!user) {
    throw new Error("존재하지 않는 유저입니다");
  }

  const comment = await prisma.comment.findFirst({
    where: { id: data.commentId },
  });

  if (!comment) {
    throw new Error("존재하지 않는 코멘트입니다");
  }

  // 이미 좋아요를 눌렀는지 확인
  const like = await prisma.like.findFirst({
    where: { commentId: data.commentId, userId: data.userId },
  });

  if (like) {
    throw new Error("이미 좋아요를 누르셨습니다");
  }

  await prisma.like.create({
    data: {
      userId: data.userId,
      commentId: data.commentId,
    },
  });

  await prisma.like.count({
    where: { commentId: data.commentId },
  });

  return { message: "좋아요를 눌렀습니다!" };
};
