import postService from "../service/post.service.js";
import { logResponse } from "../../util/log.util.js";

const create = async (req, res, next) => {
  try {
    const result = await postService.create(req.user, req.body);

    req.statusCode = 201;
    logResponse(req);
    res.status(201).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const request = req.body;
    request.postId = req.params.postId;
    await postService.remove(req.user, request);

    req.statusCode = 200;
    logResponse(req);
    res.status(200).json({
      data: "success",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  create,
  remove,
};
