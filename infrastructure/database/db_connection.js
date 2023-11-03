import "dotenv/config";
import { Sequelize } from "sequelize";
import { logger } from "../log/logger.js";
const env = process.env;

const host = env.APP === "PROD" ? env.DB_HOST_PROD : env.DB_HOST_LOCAL;
const port = env.APP === "PROD" ? env.DB_CONTAINER_PORT : env.DB_HOST_PORT;

const sequelize = new Sequelize(
  `postgres://${env.DB_USER}:${env.DB_PASSWORD}@${host}:${port}/${env.DB_NAME}`,
  {
    logging: (msg) => logger.debug(msg),
  }
);

export { sequelize };
