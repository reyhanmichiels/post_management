import { logResponse } from "../../util/log.util.js";
import commentService from "../service/comment.service.js";

const create = async (req, res, next) => {
  try {
    const request = req.body;
    request.postId = req.params.postId;
    const result = await commentService.create(req.user, request);

    req.statusCode = 201;
    logResponse(req);
    res.status(201).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  create,
};
