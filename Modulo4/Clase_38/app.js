import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
console.log(__filename);

const __dirname = path.dirname(__filename);
console.log(__dirname);

const app = express();
//Configuracion del motor de vistas
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//configuracion de los archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index", { nombre: "Enrique", apellido: "Temperini" });
});

/* ----------------- Iteraciones y Listas 1---------------------- */

app.get("/usuarios", (req, res) => {
  const usuarios = ["Ana", "Romina", "Enrique"];
  res.render("usuarios/main", { usuarios });
});

/* ----------------- Iteraciones y Listas 2---------------------- */

/* app.get("/listado", (req, res) => {
  const usuarios = ["Ana", "Romina", "Enrique"];
  res.render("main", { usuarios });
}); */

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
