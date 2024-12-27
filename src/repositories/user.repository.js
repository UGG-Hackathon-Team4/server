import { prisma } from "../db.config.js";

export const getUserById = async (userId) => {
  const user = await prisma.user.findFirst({ where: { id: userId } });

  return user;
};

export const addGallery = async (data) => {
  const user_gallery = await prisma.userGallery.create({
    data: {
      userId: data.userId,
      galleryId: data.galleryId,
    },
  });

  return user_gallery.galleryId;
};
export const getUserGalleryByFk = async (userId, galleryId) => {
  const user_gallery = await prisma.userGallery.findFirst({
    where: { galleryId: galleryId, userId: userId },
  });

  return user_gallery;
};
