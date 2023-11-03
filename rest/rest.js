import express from "express";
import { logEvent } from "../middleware/log.middleware.js";
import { errorMiddleware } from "../middleware/error.middleware.js";
import { logResponse } from "../util/log.util.js";
import { userApi } from "../route/user.route.js";
import { postApi } from "../route/post.route.js";
import { commentApi } from "../route/comment.route.js";

export const rest = express();

//global middleware before all route
rest.use(express.json());
rest.use(logEvent);

//route
rest.get("/", (req, res, next) => {
  req.statusCode = 200;

  logResponse(req);
  res.status(200).json({
    status: "success",
  });
});

rest.use(userApi);
rest.use(postApi);
rest.use(commentApi);

//global middlware afterall route
rest.use(errorMiddleware);

rest.use((req, res, next) => {
  res.status(404).json({
    error: "route not found",
  });
});
