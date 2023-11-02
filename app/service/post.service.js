import { Post } from "../model/entity.model.js";
import postValidation from "../validation/post.validation.js";
import { validate } from "../validation/validation.js";

const create = async (user, request) => {
  request = validate(postValidation.createPostValidation, request);

  return await Post.create({
    userId: user.id,
    message: request.message,
  });
};

export default {
  create,
};
