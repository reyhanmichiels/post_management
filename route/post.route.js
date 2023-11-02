import express from "express";
import { isJWTValid } from "../middleware/auth.middleware.js";
import postHandler from "../app/handler/post.handler.js";

export const postApi = new express.Router();

postApi.use(isJWTValid);

postApi.post("/api/posts", postHandler.create);
postApi.delete("/api/users/posts/:postId", postHandler.remove);
