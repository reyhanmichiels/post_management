import Joi from "joi";

const createPostValidation = Joi.object({
  message: Joi.string().required(),
});

const deletePostValidation = Joi.object({
  postId: Joi.number().positive().required(),
});

export default {
  createPostValidation,
  deletePostValidation
};
