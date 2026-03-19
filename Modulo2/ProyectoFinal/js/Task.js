//Características de la Tarea

// id          -> Identificador unico de la tarea
// nombre      -> descripcion de la tarea
// prioridad   -> tres tipos
// vencimiento -> fecha a cumplimentar
// completada  -> valor boleano que indica si la tarea esta completada o no

export class Task {
  constructor(id, nombre, prioridad, vencimiento, completada = false) {
    this.id = id;
    this.nombre = nombre;
    this.prioridad = prioridad;
    this.vencimiento = vencimiento;
    this.completada = completada;
  }
}
