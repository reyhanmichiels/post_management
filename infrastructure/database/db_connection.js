import "dotenv/config";
import { Sequelize } from "sequelize";
import { logger } from "../log/logger.js";
const env = process.env;

const sequelize = new Sequelize(
  `postgres://${env.DB_USER}:${env.DB_PASSWORD}@${env.DB_HOST}:${env.DB_HOST_PORT}/${env.DB_NAME}`,
  {
    logging: (msg) => logger.debug(msg),
  }
);

export { sequelize };
