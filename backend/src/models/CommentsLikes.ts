import { DataTypes } from "sequelize";
import sequelize from "../config/db";

const CommentsLikes = sequelize.define(
  "CommentsLikes",
  {
    like_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    comment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    underscored: true,
    tableName: "comments_likes",
    timestamps: false,
  }
);

export default CommentsLikes;
