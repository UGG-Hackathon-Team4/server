import { prisma } from "../db.config.js";

export const getArtworkByID = async (artworkId) => {
  const artwork = await prisma.artwork.findFirst({ where: { id: artworkId } });

  return artwork;
};
