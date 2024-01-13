import { DataTypes } from "sequelize";
import sequelize from "../config/db";
import ProductImage from "./ProductImages";
import ProductFlags from "./ProductFlags";
import ProductColor from "./ProductColors";
import ProductDetails from "./ProductDetails";
import ProductSizes from "./ProductSizes";
const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    quantidy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sold: {
      type: DataTypes.INTEGER,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    state: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING,
    },
    guarantee: {
      type: DataTypes.STRING,
    },
    assessment: {
      type: DataTypes.DOUBLE,
      defaultValue: 0,
    },
    qtd_assessment:{
      type: DataTypes.INTEGER
    },
    parcelable: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    max_installments: {
      type: DataTypes.INTEGER,
    },
    interest_rate: {
      type: DataTypes.DOUBLE,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  },
  {
    underscored: true,
    tableName: "product",
  },
  );
 // Definindo a associação Um-para-Muitos entre Product e ProductColor
Product.hasMany(ProductColor, {
  foreignKey: 'product_id',
  as: 'colors'
});
ProductColor.belongsTo(Product, {
  foreignKey: 'product_id',
  as: 'product'
});

// Definindo a associação Um-para-Muitos entre Product e ProductImage
Product.hasMany(ProductImage, {
  foreignKey: 'product_id',
  as: 'images'
});
ProductImage.belongsTo(Product, {
  foreignKey: 'product_id',
  as: 'product'
});

Product.hasMany(ProductFlags, {
  foreignKey: 'product_id',
  as: 'flags'
});
ProductFlags.belongsTo(Product, {
  foreignKey: 'product_id',
  as: 'product'
});

Product.hasMany(ProductDetails, {
  foreignKey: 'product_id',
  as: 'details'
});
ProductDetails.belongsTo(Product, {
  foreignKey: 'product_id',
  as: 'product'
});

Product.hasMany(ProductSizes, {
  foreignKey: 'product_id',
  as: 'sizes'
});
ProductSizes.belongsTo(Product, {
  foreignKey: 'product_id',
  as: 'product'
});

export default Product