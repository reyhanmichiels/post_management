import { logger } from "../infrastructure/log/logger.js";

export const logResponse = async (request) => {
  logger.info(`response HTTP Request`, {
    event: {
      url: request.url,
      method: request.method,
      ip: request.ip,
      status_code: request.statusCode,
    },
  });
};
