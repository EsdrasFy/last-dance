import { DataTypes } from "sequelize";
import sequelize from "../config/db";

const ProductImage = sequelize.define(
  'ProductImage',
  {
    image_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    product_id:{
      type: DataTypes.INTEGER
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    underscored: true,
    tableName: 'product_images',
    timestamps: false,
  }
);

export default ProductImage;