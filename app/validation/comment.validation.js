import Joi from "joi";

const createCommentValidation = Joi.object({
  postId: Joi.number().positive().required(),
  comment: Joi.string().required(),
});

export default { createCommentValidation };
