import { sequelize } from "../../infrastructure/database/db_connection.js";
import { DataTypes } from "sequelize";

const Comment = sequelize.define(
  "comment",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      field: "id",
    },
    comment: {
      type: DataTypes.TEXT,
      field: "comment",
      allowNull: false,
    },
  },
  {
    underscored: "true",
  }
);

export { Comment };
