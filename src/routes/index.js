import express from "express";
import {
  handleCommentAdd,
  handlecommentByLike,
  handlecommentByTime,
  handleCommentLike,
} from "../controllers/comment.controller.js";
import {
  handleGalleryAdd,
  handleGetGallery,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/comment/add", handleCommentAdd);
router.post("/artwork/like", handleCommentLike);
router.get("/comment/likes", handlecommentByLike);
router.get("/comment/time", handlecommentByTime);

router.post("/user/gallery", handleGalleryAdd);
router.get("/user/gallerys", handleGetGallery);

export default router;
