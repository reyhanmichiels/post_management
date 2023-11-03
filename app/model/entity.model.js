import { UUIDV4 } from "sequelize";
import { sequelize } from "../../infrastructure/database/db_connection.js";
import { DataTypes } from "sequelize";

const User = sequelize.define("user", {
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
});

const Post = sequelize.define("post", {
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
});

const Comment = sequelize.define("comment", {
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
});

User.hasMany(Post);
Post.belongsTo(User);

Post.hasMany(Comment);
Comment.belongsTo(Post);

User.hasMany(Comment);
Comment.belongsTo(Post);

export { User, Post, Comment };
