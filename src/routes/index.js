import express from "express";
import {
  handleCommentAdd,
  handlecommentByLike,
  handlecommentByTime,
  handleCommentLike,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/comment/add", handleCommentAdd);
router.post("/artwork/like", handleCommentLike);
router.get("/comment/likes", handlecommentByLike);
router.get("/comment/time", handlecommentByTime);

export default router;
