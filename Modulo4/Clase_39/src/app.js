import express, { json } from "express"; // Importa Express y el middleware para interpretar JSON.
import taskRoutes from "../src/routes/task.routes.js"; // Importa las rutas de la API de tareas.
import taskViewsRoutes from "../src/routes/task.view.routes.js"; // Importa las rutas que renderizan vistas.
import path from "path"; // Importa utilidades para construir rutas del sistema de archivos.

const app = express(); // Crea la aplicación de Express.
const PORT = 3000; // Define el puerto donde escuchará el servidor.

// Indica que EJS será el motor para generar páginas HTML.
app.set("view engine", "ejs");
// Define la carpeta donde están las plantillas EJS.
app.set("views", path.join(path.resolve(), "src", "views"));

// Permite leer cuerpos de solicitudes con datos JSON.
app.use(json());
// Permite leer datos enviados desde formularios HTML.
app.use(express.urlencoded({ extended: true }));

// Monta las rutas de vistas desde la raíz, por ejemplo, GET /tasks.
app.use("/", taskViewsRoutes);
// Monta las rutas de la API bajo /api, por ejemplo, GET /api/tasks.
app.use("/api", taskRoutes);

app.listen(PORT, () => {
  // Inicia el servidor y ejecuta esta función cuando queda escuchando.
  console.log(`Server Escuchando en http://localhost:${PORT}`);
  // Muestra en consola la dirección del servidor.
});

// Cierra la función de inicio del servidor.
// La API de tareas se puede probar en http://localhost:3000/api/tasks.
