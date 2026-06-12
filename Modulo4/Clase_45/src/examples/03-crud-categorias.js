// MÉTODOS USADOS EN ESTE ARCHIVO:
// ─────────────────────────────────────────────────────────────────────
//   Categoria.findAll()          →  SELECT * FROM categorias
//   Categoria.findByPk(id)       →  SELECT * FROM categorias WHERE id = ?
//   Categoria.create({ ... })    →  INSERT INTO categorias ...
//   instancia.update({ ... })    →  UPDATE categorias SET ... WHERE id = ?
//   instancia.destroy()          →  DELETE FROM categorias WHERE id = ?

import sequelize from "../../db/conexion.js";
import Categoria from "../../models/Categoria.js";

// =============================================================================
// READ — Obtener todas las categorías
// =============================================================================
async function listarCategorias() {
  console.log("\n[findAll] Todas las categorias");

  const categorias = await Categoria.findAll(); //SELECT * FROM cateogorias

  categorias.forEach((cat) => {
    console.log(`[${cat.id}] [${cat.nombre}]`);
  });
  return categorias;
}

// =============================================================================
// READ — Obtener una categoría por su ID
// =============================================================================
async function buscarPorId(id) {
  console.log(`\n[findByPk] Categoría con ID ${id}:`);

  // findByPk = find By Primary Key
  // Devuelve la instancia si existe, o null si no existe.
  const categoria = await Categoria.findByPk(id);

  if (!categoria) {
    console.log("No encontrada.");
    return null;
  }

  console.log("Encontrada:", categoria.nombre);
  return categoria;
}

// =============================================================================
// CREATE — Insertar una nueva categoría
// =============================================================================
async function crearCategoria(nombre, descripcion) {
  const nueva = await Categoria.create({ nombre, descripcion });

  console.log("Creada con id: ", nueva.id);
  return nueva;
}

async function main() {
  try {
    const electronica = await crearCategoria(
      "Hogar",
      "Electrodomésticos y artículos para el hogar",
    );
    const ropa = await crearCategoria(
      "Ropa",
      "Indumentaria y accesorios de moda",
    );
    const calzado = await crearCategoria(
      "Calzado",
      "Zapatillas, zapatos y todo tipo de calzado",
    );
    const libros = await crearCategoria(
      "Libros",
      "Libros técnicos, literatura, educativos y más",
    );
    const accesorios = await crearCategoria(
      "Accesorios",
      "Cables, fundas, adaptadores y accesorios varios",
    );
    const gaming = await crearCategoria(
      "Gaming",
      "Consolas, periféricos y videojuegos",
    );
    const deportes = await crearCategoria(
      "Deportes",
      "Ropa deportiva, calzado y equipamiento",
    );

    await listarCategorias();
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
}

main();
