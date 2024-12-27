import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("api/v1 경로입니다");
});

export default router;
