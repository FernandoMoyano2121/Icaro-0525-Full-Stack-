/******************* APLICAION DE TAREAS  ***************/

//UperCamelCase
class Tarea {
  #titulo;
  #completada;

  constructor(titulo, completada = false) {
    ((this.#titulo = titulo), (this.#completada = completada));
  }

  /* Getters y Setter  */
  //lowerCamelCase
  get titulo() {
    return this.#titulo;
  }

  get completada() {
    return this.#completada;
  }

  set titulo(nuevoTitulo) {
    this.#titulo = nuevoTitulo;
  }

  /* Metodos */
  cambiarEstado() {
    this.#completada = !this.completada;
  }

  obtenerDescripcion() {
    return `${this.titulo} - ${this.#completada ? "✅Completada" : "❌Pendiente"}`;
  }
}

class TareaConFecha extends Tarea {
  #fechaVencimiento;

  constructor(titulo, fechaVencimiento) {
    super(titulo);
    this.#fechaVencimiento = fechaVencimiento;
  }

  //Plimorfismo
  obtenerDescripcion() {
    return `${super.obtenerDescripcion()} - Vencimiento: ${this.#fechaVencimiento} `;
  }
}

class ListaTareas {
  #listado;

  constructor() {
    this.#listado = [];
  }

  agregarTareas(...tareas) {
    this.#listado.push(...tareas);
  }

  eliminarTarea(titulo) {
    this.#listado = this.#listado.filter((tarea) => tarea.titulo !== titulo);
  }

  mostrarTareas() {
    console.log("\nLISTADO DE TAREAS: \n");

    this.#listado.forEach((tarea, index) => {
      console.log(`${index + 1} - ${tarea.obtenerDescripcion()}`);
    });
  }

  obtenerCompletadas() {
    return this.#listado.filter((tarea) => tarea.completada);
  }

  obtenerPendientes() {
    return this.#listado.filter((tarea) => !tarea.completada);
  }

  completarTarea(titulo) {
    const tareaEncontrada = this.#listado.find(
      (tarea) => tarea.titulo === titulo,
    );

    if (tareaEncontrada) {
      tareaEncontrada.cambiarEstado();
    } else {
      console.log("Tarea no encontrada");
    }
  }
}

//agregarTareas(tarea1, tarea2)

const tarea1 = new Tarea("Lavar la ropa");
const tarea2 = new TareaConFecha("Estudiar JavaScript", "27/02/2026");

const miListado = new ListaTareas();

miListado.agregarTareas(tarea1, tarea2);
miListado.mostrarTareas();
miListado.completarTarea("Estudiar JavaScript");
miListado.mostrarTareas();
