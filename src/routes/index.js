import express from "express";
import {
  handleCommentAdd,
  handleCommentLike,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/comment/add", handleCommentAdd);
router.post("/artwork/like", handleCommentLike);

export default router;
