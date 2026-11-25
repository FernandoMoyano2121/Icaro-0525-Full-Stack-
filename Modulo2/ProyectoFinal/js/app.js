import { TaskManager } from "./TaskManager.js";
import { TaskUi } from "./TaskUi.js";

const manager = new TaskManager();
const taskUi = new TaskUi(manager);

//Version anterior: arrancar con la lista vacia y renderizar solo lo que se va agregando
// taskUi.render();

//Cargar las tareas iniciales desde el archivo JSON y despues renderizar
fetch("./tareas.json")
  .then((respuesta) => respuesta.json())
  .then((tareas) => {
    tareas.forEach((t) => manager.agregar(t.nombre, t.prioridad, t.vencimiento));
    taskUi.render();
  });
