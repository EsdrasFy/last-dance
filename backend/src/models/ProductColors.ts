import { DataTypes } from "sequelize";
import sequelize from "../config/db";

const ProductColor = sequelize.define(
  'ProductColor',
  {
    color_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    product_id:{
      type: DataTypes.INTEGER
    },
    name_color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    underscored: true,
    tableName: 'colors',
    timestamps: false,
  }
);

export default ProductColor;