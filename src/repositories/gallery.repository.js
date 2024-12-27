import { prisma } from "../db.config.js";

export const getGalleryByID = async (galleryId) => {
  const gallery = await prisma.gallery.findFirst({ where: { id: galleryId } });

  return gallery;
};
