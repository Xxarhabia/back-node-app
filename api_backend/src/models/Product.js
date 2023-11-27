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
    description: {
      type: DataTypes.STRING(500),
    },
    price: {
      type: DataTypes.DOUBLE,
    },
    img_url: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);
