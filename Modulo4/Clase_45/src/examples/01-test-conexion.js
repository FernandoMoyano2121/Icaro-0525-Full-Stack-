import sequelize from "../../db/conexion.js";

// sequelize.authenticate() envía una query simple a MySQL ("SELECT 1+1")
// para confirmar que la conexión funciona. No crea ni modifica tablas.

// Si falla, el error más frecuente en este punto es:
//   - ER_ACCESS_DENIED_ERROR  → usuario o contraseña incorrectos en .env
//   - ECONNREFUSED            → MySQL no está corriendo
//   - ER_BAD_DB_ERROR         → la base de datos del .env no existe

async function main() {
  console.log("Probando conexion a la base de datos");

  try {
    await sequelize.authenticate();
    console.log("Conexion exitosa");
    console.log("Host: ", sequelize.config.host);
    console.log("Base de datos : ", sequelize.config.database);
    console.log("Usuario: ", sequelize.config.username);
  } catch (error) {
    console.error(error);
  } finally {
    await sequelize.close();
    console.log("Conexion cerrada");
  }
}

main();
