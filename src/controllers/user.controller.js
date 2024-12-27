import { galleryAdd, galleryGet } from "../services/user.service.js";

export const handleGalleryAdd = async (req, res, next) => {
  console.log("유저에게 갤러리 추가를 요청했습니다!");

  try {
    const gallery = await galleryAdd(req.body);
    res.status(200).success(gallery);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const handleGetGallery = async (req, res, next) => {
  console.log("유저의 갤러리 조회를 요청했습니다!");

  try {
    const gallery = await galleryGet(req.body);

    console.log(gallery);
    res.status(200).success(gallery);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
