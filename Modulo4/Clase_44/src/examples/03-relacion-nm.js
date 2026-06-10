import pool from "../../db/conexion.js";

// ── Estructura genérica (INNER JOIN con tabla intermedia) ──
//   SELECT <columnas>
//   FROM <tabla_A>
//   INNER JOIN <tabla_intermedia> ON <tabla_intermedia.fk_A> = <tabla_A.pk>
//   INNER JOIN <tabla_B>          ON <tabla_B.pk>            = <tabla_intermedia.fk_B>;
async function obtenerProductosConCategorias() {
  const [rows] = await pool.execute(`
    SELECT p.id AS producto_id,
           p.nombre AS producto,
           p.precio,
           c.id AS categoria_id,
           c.nombre AS categoria
    FROM productos p
    INNER JOIN producto_categoria pc ON pc.producto_id = p.id
    INNER JOIN categorias c          ON c.id           = pc.categoria_id
    ORDER BY p.nombre, c.nombre
  `);

  rows.forEach((row) => {
    console.log(
      `[${row.producto_id}] ${row.producto} ($${row.precio}) → ${row.categoria}`,
    );
  });

  return rows;
}

async function main() {
  try {
    await obtenerProductosConCategorias();
  } catch (error) {
    console.error("Error: ", error.message);
  } finally {
    await pool.end();
  }
}

main();
