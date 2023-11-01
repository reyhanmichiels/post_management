import { UUIDV4 } from "sequelize";
import { sequelize } from "../../infrastructure/database/db_connection.js";
import { DataTypes } from "sequelize";

const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
      field: "id",
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "name",
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      field: "email",
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "password",
    },
  },
  {
    underscored: "true",
  }
);

export { User };
