import { DataTypes } from "sequelize";
import sequelize from "../connection.js";

const Usuario = sequelize.define(
  "Usuario",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false, // NOT NULL en SQL
    },

    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true, // UNIQUE en SQL → no pueden repetirse emails
    },

    password: {
      type: DataTypes.STRING(255), // bcrypt genera hashes de ~60 chars
      allowNull: false,
    },

    rol: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "usuario", // si no se envía rol, será "usuario"
    },
  },
  {
    // timestamps: true (por defecto) → Sequelize agrega createdAt y updatedAt
    timestamps: true,
    tableName: "Usuarios",
  },
);

export default Usuario;
