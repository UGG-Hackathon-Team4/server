import { prisma } from "../db.config.js";
import { AlreadyExistError, NotFoundError } from "../error.js";
import { getGalleryByID } from "../repositories/gallery.repository.js";
import {
  addGallery,
  getUserById,
  getUserGalleryByFk,
} from "../repositories/user.repository.js";

export const galleryAdd = async (data) => {
  const user = await getUserById(data.userId);

  if (!user) {
    throw new NotFoundError("존재하지 않는 유저입니다");
  }

  const gallery = await getGalleryByID(data.galleryId);
  if (!gallery) {
    throw new NotFoundError("존재하지 않는 전시회입니다");
  }

  const user_gallery = await getUserGalleryByFk(data.userId, data.galleryId);

  if (user_gallery) {
    throw new AlreadyExistError("이미 방문한 전시회입니다");
  }
  const galleryId = await addGallery(data);

  return await getGalleryByID(galleryId);
};

export const galleryGet = async (data) => {
  const user = await getUserById(data.userId);

  if (!user) {
    throw new NotFoundError("존재하지 않는 유저입니다");
  }

  const userGalleries = await prisma.userGallery.findMany({
    where: {
      userId: data.userId,
    },
    include: {
      gallery: {
        select: {
          id: true,
          title: true,
          location: true,
          startDate: true,
          endDate: true,
        },
      },
    },
  });

  // 갤러리 정보만 추출
  const galleries = userGalleries.map((ug) => ug.gallery);

  return { galleries };
};
