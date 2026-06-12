import { DataTypes } from "sequelize";
import sequelize from "../db/conexion.js";

const Producto = sequelize.define(
  "Producto",
  {
    nombre: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    precio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0, // equivale a DEFAULT 0
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true, // equivale a DEFAULT TRUE
    },
  },
  {
    tableName: "productos",
    timestamps: true, // Sequelize maneja createdAt y updatedAt
    createdAt: "creado_en", // mapea al nombre real de la columna en la BD
    updatedAt: "actualizado_en", // mapea al nombre real de la columna en la BD
  },
);

export default Producto;
