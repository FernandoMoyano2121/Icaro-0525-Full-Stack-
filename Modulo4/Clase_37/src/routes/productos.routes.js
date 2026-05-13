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
    res.status(404).json({ error: "Producto no encontrado" });
  }
  productos.splice(index, 1);
  productos.forEach((p, i) => (p.id = i + 1));
  res.json({ mesage: "Producto eliminado" });
});
export default router;
