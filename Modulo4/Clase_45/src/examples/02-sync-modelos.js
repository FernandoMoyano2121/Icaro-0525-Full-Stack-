import sequelize from "../../db/conexion.js";
import Categoria from "../../models/Categoria.js";
import Producto from "../../models/Producto.js";

async function main() {
  console.log("Sincronizando modelos con la base de datos! ");
  try {
    // Antes de borrar las tablas, deshabilitamos el chequeo de FK.
    // Esto es necesario porque la Clase 44 dejó una tabla "producto_categoria"
    // con FK que apuntan a "productos" y a "categorias".
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
    // Eliminamos la tabla intermedia manualmente porque sync({ force: true })
    // solo conoce los modelos importados (Categoria y Producto).
    // La tabla producto_categoria no es un modelo de Sequelize en este archivo,
    await sequelize.query("DROP TABLE IF EXISTS producto_categoria");
    await sequelize.sync({ force: true });
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 1");

    console.log("-- Tablas sincronizadas");
  } catch (error) {
    console.error(error.message);
  } finally {
    await sequelize.close();
    console.log("Conexion cerrada");
  }
}

main();
