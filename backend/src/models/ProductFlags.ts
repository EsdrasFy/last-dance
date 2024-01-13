import { DataTypes } from "sequelize";
import sequelize from "../config/db";

const ProductFlags = sequelize.define(
  'ProductFlags',
  {
    flag_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    product_id:{
      type: DataTypes.INTEGER
    },
    flag: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    underscored: true,
    tableName: 'product_flags',
    timestamps: false,
  }
);

export default ProductFlags;