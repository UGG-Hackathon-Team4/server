import {
  commentAdd,
  commentLike,
  getCommentByLike,
  getCommentByTime,
} from "../services/comment.service.js";

export const handleCommentAdd = async (req, res, next) => {
  console.log("코멘트 등록을 요청했습니다!");

  try {
    const comment = await commentAdd(req.body);
    res.status(200).success(comment);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const handleCommentLike = async (req, res, next) => {
  console.log("코멘트 좋아요를 요청했습니다!");
  //userId commentId
  try {
    const like = await commentLike(req.body);
    res.status(200).success(like);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const handlecommentByLike = async (req, res, next) => {
  console.log("코멘트 좋아요 순 조회");
  try {
    const comments = await getCommentByLike();
    res.status(200).success(comments);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
export const handlecommentByTime = async (req, res, next) => {
  console.log("코멘트 최신순 조회");
  try {
    const comments = await getCommentByTime();
    res.status(200).success(comments);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
