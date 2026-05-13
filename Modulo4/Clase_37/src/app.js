import express, { json } from "express";
import productosRoutes from "./routes/productos.routes.js";

const app = express();
const PORT = 3000;

app.use(json());
//--------------------Rutas para productos---------------------

app.use("/productos", productosRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
