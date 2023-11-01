import { logger } from "../infrastructure/log/logger.js";

const logEvent = async (req, res, next) => {
  logger.info(`incoming HTTP Request`, {
    event: {
      url: req.url,
      method: req.method,
      ip: req.ip,
    },
  });

  next();
};



export { logEvent };
