import express from "express";
import { isJWTValid } from "../middleware/auth.middleware.js";
import commentHandler from "../app/handler/comment.handler.js";

export const commentApi = new express.Router();

commentApi.use(isJWTValid);

commentApi.post("/api/posts/:postId/comments", commentHandler.create);
