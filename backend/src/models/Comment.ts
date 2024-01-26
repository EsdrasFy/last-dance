import { DataTypes } from "sequelize";
import sequelize from "../config/db";
import Product from "./Product";
import User from "./User";
import CommentsUrls from "./CommentUrls";
import CommentsLikes from "./CommentsLikes";

const Comment = sequelize.define(
  "Comment",
  {
    comment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    text_comment: {
      type: DataTypes.TEXT,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_img: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    recommend: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    timespost: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  },
  {
    underscored: true,
    tableName: "comments",
    timestamps: false,
  }
);

Comment.belongsTo(Product, {
  foreignKey: "id",
});
Comment.belongsTo(User, {
  foreignKey: "user_id",
});

CommentsUrls.belongsTo(Comment, {
  foreignKey: "comment_id",
  as: "comment",
});
CommentsLikes.belongsTo(Comment, {
  foreignKey: "comment_id",
  as: "comment",
});

CommentsLikes.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

export default Comment;
