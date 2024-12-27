import express from "express";
import { handleCommentAdd } from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/comment/add", handleCommentAdd);

export default router;
