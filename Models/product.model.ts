import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../db_init";

export const product = sequelize.define(
  "product",
  {
    product_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product_desc: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    product_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);
