import pool from "../../db/conexion.js";

async function testConexion() {
  try {
    const [rows, fields] = await pool.execute(
      "SELECT DATABASE() AS base_actual",
    );
    console.log("Conexion exitosa a MySQL");
    console.log("Estructura de rows: ", rows);
    console.log("Estructura de fields: ", fields);
  } catch (error) {
    console.error("Error al conectar con  MySQL");
    process.exit(1);
  }
}

testConexion();
