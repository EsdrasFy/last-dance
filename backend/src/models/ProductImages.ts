import { DataTypes } from "sequelize";
import sequelize from "../config/db";

const ProductImage = sequelize.define(
  'ProductImage',
  {
    oroduct_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    underscored: true,
    tableName: 'product_images',
  }
);

export default ProductImage;