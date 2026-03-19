import { Task } from "./Task.js";

export class TaskManager {
  constructor() {
    this.tareas = [];
    this.nextId = 1;
  }

  /* Agregar tareas */
  agregar(nombre, prioridad, vencimiento) {
    const tarea = new Task(this.nextId++, nombre, prioridad, vencimiento);
    this.tareas.push(tarea);
  }

  /* Editar una tarea */
  editar(id, nombre, prioridad, vencimiento) {
    const tarea = this.tareas.find((t) => t.id === id);

    if (tarea) {
      tarea.nombre = nombre;
      tarea.prioridad = prioridad;
      tarea.vencimiento = vencimiento;
    }
  }

  /* Eliminar */
  eliminar(id) {
    this.tareas = this.tareas.filter((t) => t.id !== id);
  }

  /* Marcar tarea como completada */
  marcarCompletada(id) {
    const tarea = this.tareas.find((t) => t.id === id);

    if (tarea) {
      tarea.completada = !tarea.completada;
    }
  }

  /* obtener tareas completadas */
  obtenerCompletadas() {
    return this.tareas.filter((t) => !t.completada);
  }

  /* obtener tareas completadas */
  obtenerPendientes() {
    return this.tareas.filter((t) => !t.completada).length;
  }
}
