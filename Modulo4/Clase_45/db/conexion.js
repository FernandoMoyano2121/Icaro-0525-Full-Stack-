import "dotenv/config";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    dialect: "mysql", // le indica a Sequelize qué motor de BD usar

    // Oculta los logs SQL en consola. Cambiar a console.log para verlos.
    logging: false,
  },
);

export default sequelize;
