import { Post, User, Comment } from "../app/model/entity.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const removeAllTestUser = async () => {
  await User.destroy({
    where: {
      name: "test_name",
    },
  });
};

const createTestUser = async () => {
  await User.create({
    name: "test_name",
    email: "test@email.com",
    password: await bcrypt.hash("test_password", 10),
  });
};

const getTestUser = async () => {
  return await User.findOne({
    where: {
      email: "test@email.com",
    },
  });
};

const createTestPost = async () => {
  const loginUser = await getTestUser();

  await Post.create({
    userId: loginUser.id,
    message: "test_message",
  });
};

const removeAllTestPost = async () => {
  await Post.destroy({
    where: {
      message: "test_message",
    },
  });
};

const getTestUserToken = async () => {
  const user = await getTestUser();

  return jwt.sign(
    {
      userId: user.id,
    },
    process.env.JWT_SECRET_TOKEN,
    {
      expiresIn: 60,
    }
  );
};

const getTestPost = async () => {
  return await Post.findOne({
    where: {
      message: "test_message",
    },
  });
};

const removeAllTestComment = async () => {
  await Comment.destroy({
    where: {
      comment: "test_comment",
    },
  });
};

export {
  removeAllTestUser,
  createTestUser,
  createTestPost,
  removeAllTestPost,
  getTestUser,
  getTestUserToken,
  getTestPost,
  removeAllTestComment,
};
