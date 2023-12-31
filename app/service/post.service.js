import { ResponseError } from "../../exception/response.error.js";
import { sequelize } from "../../infrastructure/database/db_connection.js";
import { Post, Comment } from "../model/entity.model.js";
import postValidation from "../validation/post.validation.js";
import { validate } from "../validation/validation.js";

const create = async (user, request) => {
  request = validate(postValidation.createPostValidation, request);

  return await Post.create({
    userId: user.id,
    message: request.message,
  });
};

const remove = async (user, request) => {
  request = validate(postValidation.deletePostValidation, request);

  try {
    await sequelize.transaction(async (t) => {
      const totalPostInDatabase = await Post.findAndCountAll(
        {
          where: {
            userId: user.id,
            id: request.postId,
          },
        },
        {
          transaction: t,
        }
      );

      if (totalPostInDatabase.count === 0) {
        throw new ResponseError(404, "post not found");
      }

      await Post.destroy(
        {
          where: {
            id: request.postId,
          },
        },
        {
          transaction: t,
        }
      );
    });
  } catch (error) {
    throw new ResponseError(error.status, error.message);
  }
};

const getAll = async () => {
  return await Post.findAll({
    include: Comment,
  });
};

export default {
  create,
  remove,
  getAll,
};
