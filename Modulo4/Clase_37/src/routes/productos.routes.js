import { Router } from "express";

const router = Router();

let productos = [];

router.get("/", (req, res) => {
  res.json(productos);
});

router.post("/", (req, res) => {
  const nuevoProducto = req.body;
  nuevoProducto.id = productos.length + 1;
  productos.push(nuevoProducto);

  res.status(200).json({
    nuevoProducto,
  });
});

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const datosActualizados = req.body;

  let producto = productos.find((p) => p.id === id);

  if (!producto) {
    return res.status(404).json({
      error: "Producto no encontrado",
    });
  }
  producto = { ...producto, ...datosActualizados };
  const index = productos.findIndex((p) => p.id === id);
  productos[index] = producto;

  res.json(producto);
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = productos.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }
  productos.splice(index, 1);
  productos.forEach((p, i) => (p.id = i + 1));
  res.json({ mesage: "Producto eliminado" });
});
export default router;

/*
  CONJUNTOS DE DATOS PARA PROBAR LA API DE PRODUCTOS
  Servidor: http://localhost:3000

  Producto 1:
  {
    "nombre": "Notebook",
    "precio": 850000,
    "stock": 10
  }

  Producto 2:
  {
    "nombre": "Mouse",
    "precio": 25000,
    "stock": 30
  }

  Producto 3:
  {
    "nombre": "Teclado",
    "precio": 45000,
    "stock": 15
  }

  Datos para actualizar el producto 1:
  {
    "precio": 795000,
    "stock": 8
  }

  PRUEBAS PASO A PASO EN THUNDER CLIENT

  1. GET /productos - Obtener todos los productos------------------------
     1. Abrir Thunder Client y crear una nueva petición.
     2. Seleccionar el metodo GET.
     3. Ingresar: http://localhost:3000/productos
     4. Enviar la petición.
     5. Verificar que la respuesta sea un arreglo JSON.
     6. Si todavía no se cargaron productos, la respuesta inicial debe ser [].

  2. POST /productos - Crear productos-------------------------------------
     1. Crear una nueva petición y seleccionar el metodo POST.
     2. Ingresar: http://localhost:3000/productos
     3. Abrir Body, seleccionar JSON y pegar el Producto 1:
        {
          "nombre": "Notebook",
          "precio": 850000,
          "stock": 10
        }
     4. Enviar la petición.
     5. Verificar que se reciba el nuevo producto con "id": 1.
     6. Repetir el procedimiento con el Producto 2 para obtener el id 2.
     7. Repetir nuevamente con el Producto 3 para obtener el id 3.

  3. PUT /productos/:id - Actualizar un producto existente---------------------
     1. Crear una nueva petición y seleccionar el metodo PUT.
     2. Ingresar: http://localhost:3000/productos/1
     3. Abrir Body, seleccionar JSON y pegar:
        {
          "precio": 795000,
          "stock": 8
        }
     4. Enviar la petición.
     5. Verificar que se conserve el nombre del producto y se actualicen
        el precio y el stock.

     Caso de prueba con un id inexistente:
     1. Cambiar la URL a http://localhost:3000/productos/999
     2. Enviar los mismos datos.
     3. Verificar la respuesta 404 con el mensaje
        "Producto no encontrado".

  4. DELETE /productos/:id - Eliminar un producto-----------------------------
     1. Crear una nueva petición y seleccionar el metodo DELETE.
     2. Ingresar: http://localhost:3000/productos/2
     3. No es necesario enviar un Body.
     4. Enviar la petición.
     5. Verificar la respuesta { "mesage": "Producto eliminado" }.
     6. Ejecutar nuevamente GET /productos para comprobar que solo quedan
        los demás productos y que sus identificadores se hayan reenumerado.

     Caso de prueba con un id inexistente:
     1. Repetir DELETE con http://localhost:3000/productos/999.
     2. Verificar la respuesta con error 404. Para volver a probarlo
        correctamente, primero se debe crear nuevamente el producto.
*/
