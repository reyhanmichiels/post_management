import { ResponseError } from "../../exception/response.error.js";
import { sequelize } from "../../infrastructure/database/db_connection.js";
import { Comment, Post } from "../model/entity.model.js";
import commentValidation from "../validation/comment.validation.js";
import { validate } from "../validation/validation.js";

const create = async (user, request) => {
  request = validate(commentValidation.createCommentValidation, request);

  try {
    const comment = sequelize.transaction(async (t) => {
      const totalPostInDatabase = await Post.findAndCountAll({
        where: {
          id: request.postId,
        },
      });

      if (totalPostInDatabase.count === 0) {
        throw new ResponseError(404, "post not found");
      }

      return Comment.create({
        userId: user.id,
        postId: request.postId,
        comment: request.comment,
      });
    });

    return comment;
  } catch (error) {
    throw new ResponseError(error.status, error.message);
  }
};

export default {
  create,
};
