import pool from "../../db/conexion.js";

async function crearProductoConCategoria(producto, categoriaId) {
  const conexion = await pool.getConnection();

  try {
    // ── PASO 1: Iniciar la transacción ────────────────────────────────────

    await conexion.beginTransaction();
    console.log("\n  🟡 BEGIN — transacción iniciada");

    // ── PASO 2: Insertar el producto ──────────────────────────────────────

    const [resultadoProducto] = await conexion.execute(
      `INSERT INTO productos (nombre, descripcion, precio, stock)
             VALUES (?, ?, ?, ?)`,
      [
        producto.nombre,
        producto.descripcion || null,
        producto.precio,
        producto.stock || 0,
      ],
    );

    const nuevoId = resultadoProducto.insertId;
    console.log(`  ✅ Producto insertado — insertId: ${nuevoId}`);

    // ── PASO 3: Asignar la categoría ──────────────────────────────────────
    const resultadoRelacion = await conexion.execute(
      `INSERT INTO producto_categoria (producto_id, categoria_id)
             VALUES (?, ?)`,
      [nuevoId, categoriaId],
    );

    console.log(`affectedRows: ${resultadoRelacion.affectedRows}`);

    // ── PASO 4: COMMIT ────────────────────────────────────────────────────
    await conexion.commit();
    console.log("  🟢 COMMIT — cambios aplicados");
    console.log(
      `\n  Producto "${producto.nombre}" creado con ID ${nuevoId} y categoría ${categoriaId} asignada.`,
    );

    return nuevoId;
  } catch (error) {
    // ── PASO 5 (alternativo): ROLLBACK ────────────────────────────────────

    await conexion.rollback();
    console.log("❌Rollback - cambios descartados");
    console.log(`Error: ${error.message}`);
    return null;
  } finally {
    conexion.release();
  }
}

async function main() {
  console.log("=".repeat(60));
  console.log(" DEMO TRANSACCIONES");
  console.log("=".repeat(60));

  // ── ESCENARIO A: Todo correcto ────────────────────────────────────────────

  // La categoría ID 1 (Electrónica) existe → ambas operaciones deben persistir
  console.log("\n\nESCENARIO A — categoría válida (ID 1: Electrónica)");
  await crearProductoConCategoria(
    {
      nombre: 'Tablet Pro 12"',
      descripcion: "Tablet de alta gama",
      precio: 450000,
      stock: 5,
    },
    1, // Electrónica
  );

  // ── ESCENARIO B: Categoría inexistente → ROLLBACK ─────────────────────────

  // La categoría ID 999 no existe → el INSERT de producto_categoria fallará
  // con ER_NO_REFERENCED_ROW_2 (FK violation) → ROLLBACK → el producto tampoco queda
  console.log("\n\n ESCENARIO B — categoría inválida (ID 999: no existe)");
  await crearProductoConCategoria(
    {
      nombre: "Smartwatch X",
      descripcion: "Reloj inteligente",
      precio: 180000,
      stock: 12,
    },
    999, // No existe → provoca error de FK → ROLLBACK
  );

  // ── Verificación final ────────────────────────────────────────────────────

  // Solo el producto del ESCENARIO A debe estar en la BD
  console.log("\n\n VERIFICACIÓN — productos en la base de datos:");
  console.log("─".repeat(60));

  const [productos] = await pool.execute(
    `SELECT p.nombre, c.nombre AS categoria
         FROM productos p
         LEFT JOIN producto_categoria pc ON pc.producto_id = p.id
         LEFT JOIN categorias c          ON c.id = pc.categoria_id
         WHERE p.nombre IN ('Tablet Pro 12"', 'Smartwatch X')`,
  );

  if (productos.length === 0) {
    console.log("  (ninguno de los dos productos está en la BD)");
  } else {
    productos.forEach((p) => {
      const cat = p.categoria || "sin categoría";
      console.log(`  ✔ ${p.nombre} — ${cat}`);
    });
  }
  // Resultado esperado: solo "Tablet Pro 12"" aparece con "Electrónica"
  // "Smartwatch X" no existe porque su transacción hizo ROLLBACK

  await pool.end();
  console.log("\n🔌 Pool cerrado.\n");
}

main();
