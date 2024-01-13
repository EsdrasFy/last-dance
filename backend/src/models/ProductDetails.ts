import { DataTypes } from "sequelize";
import sequelize from "../config/db";

const ProductDetails = sequelize.define(
  'ProductDetails',
  {
    detail_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    product_id:{
      type: DataTypes.INTEGER
    },
    detail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    underscored: true,
    tableName: 'product_details',
    timestamps: false,
  }
);

export default ProductDetails;