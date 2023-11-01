import { sequelize } from "../../infrastructure/database/db_connection.js";
import { DataTypes } from "sequelize";

const Post = sequelize.define(
  "post",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      field: "id",
    },
    message: {
      type: DataTypes.TEXT,
      field: "message",
      allowNull: false,
    },
  },
  {
    underscored: "true",
  }
);

export { Post };
