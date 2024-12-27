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
  console.log(data.userId, data.galleryId);
  const galleryId = await addGallery(data);

  return await getGalleryByID(galleryId);
};
