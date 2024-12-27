import { prisma } from "../db.config.js";

export const getUserByID = async (userId) => {
  const user = await prisma.user.findFirst({ where: { id: userId } });

  return user;
};
