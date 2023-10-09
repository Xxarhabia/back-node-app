import { DataTypes } from "sequelize";

import { sequelize } from "../database/database.js";

export const Product = sequelize.define(
  "Products",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    category: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.DOUBLE,
    },
    img_url: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
