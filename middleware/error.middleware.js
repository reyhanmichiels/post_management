import { ResponseError } from "../exception/response.error.js";
import { logger } from "../infrastructure/log/logger.js";

export const errorMiddleware = async (err, req, res, next) => {
  const logLevel = err.status === 500 ? "error" : "warn";
  logger.log(logLevel, `failed HTTP Request`, {
    event: {
      url: req.url,
      method: req.method,
      ip: req.ip,
      status_code: err.status,
      error: err.message,
    },
  });

  if (err instanceof ResponseError) {
    res
      .status(err.status)
      .json({
        error: err.message,
      })
      .end();
  } else {
    res.status(500).json({
      error: err.message,
    });
  }

  next();
  return;
};
