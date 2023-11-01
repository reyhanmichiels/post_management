import "dotenv/config";
import { sequelize } from "../infrastructure/database/db_connection.js";
import { logger } from "../infrastructure/log/logger.js";
import { rest } from "../rest/rest.js";
import { User } from "../app/model/user.model.js";
import { Post } from "../app/model/post.model.js";
import { Comment } from "../app/model/comment.model.js";
import "../app/model/relation.model.js";

try {
  await sequelize.authenticate();
  logger.info("Connection has been established successfully.");
} catch (error) {
  logger.error("Unable to connect to the database:", error);
}

sequelize.sync({ force: true });

rest.listen(3000, () => {
  logger.info("App listen at port 3000");
});
