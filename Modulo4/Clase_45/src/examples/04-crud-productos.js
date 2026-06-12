import { Op } from "sequelize";
import sequelize from "../../db/conexion.js";
import Producto from "../../models/Producto.js";

async function insertarProductos() {
  const productos = await Producto.bulkCreate([
    {
      nombre: "Smartphone Samsung Galaxy A54",
      descripcion:
        'Pantalla AMOLED 6.4", 128GB, cámara triple 50MP, batería 5000mAh.',
      precio: 349999.0,
      stock: 50,
    },
    {
      nombre: "Notebook Lenovo IdeaPad 3",
      descripcion: 'Intel Core i5, 8GB RAM, 512GB SSD, pantalla 15.6" Full HD.',
      precio: 749999.0,
      stock: 20,
    },
    {
      nombre: "Auriculares Sony WH-1000XM5",
      descripcion:
        "Cancelación activa de ruido, 30hs batería, conexión multipunto.",
      precio: 129999.0,
      stock: 35,
    },
    {
      nombre: 'Smart TV LG 55" 4K UHD',
      descripcion:
        "Panel NanoCell, webOS, compatible con Alexa y Google Assistant.",
      precio: 549999.0,
      stock: 15,
    },
    {
      nombre: "Cafetera Philips Senseo",
      descripcion: "Monodosis, 15 bares de presión, depósito de 1 litro.",
      precio: 45999.0,
      stock: 40,
    },
    {
      nombre: "Aspiradora Robot iRobot Roomba i3",
      descripcion:
        "Navegación inteligente, compatible con Alexa, vaciado automático.",
      precio: 189999.0,
      stock: 10,
    },
    {
      nombre: "Zapatillas Nike Air Max 270",
      descripcion: "Unidad de aire Max en el talón, suela de goma. Talle 42.",
      precio: 89999.0,
      stock: 25,
    },
    {
      nombre: "Remera Adidas Essentials",
      descripcion: "Algodón 100%, corte regular, colores surtidos. Talle M.",
      precio: 12999.0,
      stock: 100,
    },
    {
      nombre: "Clean Code - Robert C. Martin",
      descripcion: null,
      precio: 8999.0,
      stock: 30,
    },
    {
      nombre: "Cable USB-C 2 metros",
      descripcion:
        "Carga rápida hasta 60W, compatible con la mayoría de dispositivos.",
      precio: 2999.0,
      stock: 200,
    },
    {
      nombre: "Mouse Gamer Logitech G502 Hero",
      descripcion:
        "Sensor HERO 25K DPI, 11 botones programables, peso ajustable.",
      precio: 59999.0,
      stock: 45,
    },
    {
      nombre: "Zapatillas Adidas Ultraboost Running",
      descripcion: "Tecnología Boost para máxima amortiguación. Talle 41.",
      precio: 119999.0,
      stock: 30,
      activo: false,
    },
  ]);
  console.log(`${productos.length} productos insertados`);
}

async function productosMasCaros() {
  console.log("[findAll + Op.gt + limit] Los 3 productos más caros:");

  // bulkCreate() inserta múltiples registros en una sola query.
  // Equivale a INSERT INTO ... VALUES (...), (...), (...)
  // Usamos los mismos productos del tienda_completa.sql de Clase 44
  // para mantener consistencia entre los ejemplos.
  const productos = await Producto.findAll({
    where: { precio: { [Op.gt]: 1000 } }, //WHERE precio > 1000
    order: [["precio", "DESC"]], //ORDER BY precio DESC
    limit: 3, //LIMIT 3
  });

  productos.forEach((p) => {
    console.log(`${p.nombre.padEnd(40)} - ${p.precio}`);
  });
}

async function main() {
  console.log("[DEMO - FILTROS]");
  try {
    await insertarProductos();
    await productosMasCaros();
  } catch (error) {
    console.log(error.message);
  } finally {
    await sequelize.close();
  }
}

main();
