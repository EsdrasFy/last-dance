import { DataTypes } from "sequelize";
import sequelize from "../config/db";

const CommentsUrls = sequelize.define(
  'CommentsUrls',
  {
    url_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    CompressionStream_id:{
      type: DataTypes.INTEGER
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    underscored: true,
    tableName: 'comments_urls',
    timestamps: false,
  }
);

export default CommentsUrls;