import "dotenv/config";
import { sequelize } from "../infrastructure/database/db_connection.js";
import { logger } from "../infrastructure/log/logger.js";
import { rest } from "../rest/rest.js";

try {
  await sequelize.authenticate();
  logger.info("Connection has been established successfully.");
} catch (error) {
  logger.error("Unable to connect to the database:", error);
}

sequelize.sync({ alter: true });

rest.listen(3000, () => {
  logger.info("App listen at port 3000");
});
