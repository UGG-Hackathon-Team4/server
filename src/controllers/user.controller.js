import { galleryAdd } from "../services/user.service.js";

export const handleGalleryAdd = async (req, res, next) => {
  console.log("유저에게 갤러리 추가를 요청했습니다!");

  try {
    const user = await galleryAdd(req.body);
    res.status(200).success(user);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
