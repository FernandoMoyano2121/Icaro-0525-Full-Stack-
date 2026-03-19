import { TaskManager } from "./TaskManager.js";
import { TaskUi } from "./TaskUi.js";

const manager = new TaskManager();
const taskUi = new TaskUi(manager);

//TODO: Ejecutar metodo render
taskUi.render();
