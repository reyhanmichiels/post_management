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

export default {
  create,
};
