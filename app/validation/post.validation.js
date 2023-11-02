import Joi from "joi";

const createPostValidation = Joi.object({
  message: Joi.string().required(),
});

export default {
  createPostValidation,
};
