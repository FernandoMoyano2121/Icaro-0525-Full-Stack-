import express, { json } from "express";
import taskRoutes from "../src/routes/task.routes.js";
import taskViewsRoutes from "../src/routes/task.view.routes.js";
import path from "path";

const app = express();
const PORT = 3000;

// Configurar EJS
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "src", "views"));

app.use(json());

app.use(express.urlencoded({ extended: true }));

app.use("/", taskViewsRoutes);
app.use("/api", taskRoutes);

//Arrancar el servidor
app.listen(PORT, () => {
  console.log(`Server Escuchando en http://localhost:${PORT}`);
});

//http://localhost:3000/api/tasks
