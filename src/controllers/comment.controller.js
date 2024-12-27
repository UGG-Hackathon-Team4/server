import { commentAdd, commentLike } from "../services/comment.service.js";

export const handleCommentAdd = async (req, res, next) => {
  console.log("코멘트 등록을 요청했습니다!");

  try {
    const comment = await commentAdd(req.body);
    res.status(200).send(comment);
  } catch (error) {
    console.log(error);
    // next(error);
  }
};

export const handleCommentLike = async (req, res, next) => {
  console.log("코멘트 좋아요를 요청했습니다!");
  //commentId  userId 요청
  try {
    const like = await commentLike(req.body);
    res.status(200).send(like);
  } catch (error) {
    console.log(error);
    // next(error);
  }
};
