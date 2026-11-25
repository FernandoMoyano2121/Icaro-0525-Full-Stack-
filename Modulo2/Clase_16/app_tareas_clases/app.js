//------------------------------------------------------
//          Aplicacion de Tareas (Clases y POO)
//------------------------------------------------------

/* ************** RELACIONES ENTRE CLASES *********************

  +--------------+-------------+-----------------------------+------+
  | Relación     | Se lee como | Ejemplo                     | Acá  |
  +--------------+-------------+-----------------------------+------+
  | Herencia     | "es un"     | Perro extends Animal        |  No  |
  +--------------+-------------+-----------------------------+------+
  | Asociación   | "usa un"    | Cliente usa un Cajero       |  No  |
  +--------------+-------------+-----------------------------+------+
  | Agregación   | "tiene un"  | Equipo tiene Jugadores      |  No  |
  |              | (parte      | (el jugador existe aunque   |      |
  |              | independ.)  |  el equipo desaparezca)     |      |
  +--------------+-------------+-----------------------------+------+
  | Composición  | "tiene un"  | ListaTareas tiene Tareas    |  SÍ  |
  |              | (parte      | (las tareas nacen y viven   |      |
  |              | dependiente)|  dentro de la lista)        |      |
  +--------------+-------------+-----------------------------+------+

  Las mismas relaciones según UML, de la más débil a la más fuerte:

  +----------------+---------------+---------------+--------------------------+--------+
  | Relación UML   | Nombre común  | Vínculo       | Cómo se dibuja           | Acá    |
  +----------------+---------------+---------------+--------------------------+--------+
  | Dependencia    | "usa por un   | Muy débil     | Línea punteada con       |        |
  |                |  momento"     |               | flecha    - - - - ->     | No     |
  +----------------+---------------+---------------+--------------------------+--------+
  | Asociación     | "usa un"      | Débil         | Línea continua           |        |
  |                |               |               | con flecha --------->    | No     |
  +----------------+---------------+---------------+--------------------------+--------+
  | Agregación     | "tiene un"    | Media         | Rombo vacío del lado     |        |
  |                | (independ.)   |               | del todo   <>-------     | No     |
  +----------------+---------------+---------------+--------------------------+--------+
  | Composición    | "tiene un"    | Fuerte        | Rombo lleno del lado     |        |
  |                | (dependiente) |               | del todo   <#>------     | SÍ     |
  +----------------+---------------+---------------+--------------------------+--------+
  | Realización    | Implementar   | Fuerte        | Línea punteada con       |        |
  |                | una interfaz  |               | triángulo  - - - -|>     | No (*) |
  +----------------+---------------+---------------+--------------------------+--------+
  | Generalización | Herencia      | Muy fuerte    | Flecha con triángulo     |        |
  |                | "es un"       | (máx. acople) | vacío      -------|>     | No     |
  +----------------+---------------+---------------+--------------------------+--------+
  (*) JavaScript no tiene interfaces, por eso la realización
      casi no aparece en JS.
  "Vínculo" = cuánto depende una clase de la otra (acoplamiento):
      cuanto más fuerte, más afecta a una el cambio en la otra.

  Jerarquía en esta aplicación:

      ListaTareas            <- el "todo": crea y administra
          |
          | tiene 0 o más (composición)
          v
        Tarea                <- la "parte": no existe por fuera

  ¿Por qué composición y no herencia?
  - Una Tarea NO "es una" ListaTareas, ni al revés: no hay extends.
  - ListaTareas crea cada Tarea con "new" dentro de agregarTarea()
    y la guarda en su #listado privado. Nadie de afuera la toca.
  - Si eliminamos la tarea de la lista, deja de existir en la app.

  una buena pregunta es: “si borro el contenedor, ¿la parte sigue existiendo?”.
  Si un equipo desaparece, los jugadores siguen existiendo (agregación).
  Si la lista desaparece, sus tareas desaparecen con ella (composición).

*************************************************************/

/* ************************ CLASE TAREA ************************/
// Molde para crear cada tarea.
// Sus propiedades son privadas (#): desde afuera solo se pueden
// leer con los getters o modificar con los métodos de la clase.

class Tarea {
  #id;
  #titulo;
  #completada;

  constructor(id, titulo, completada = false) {
    this.#id = id;
    this.#titulo = titulo;
    this.#completada = completada;
  }

  get id() {
    return this.#id;
  }

  get titulo() {
    return this.#titulo;
  }

  get completada() {
    return this.#completada;
  }

  // No hay setter para "completada": la única forma de cambiarla
  // es con este método, que solo permite marcarla como completada.
  completar() {
    this.#completada = true;
  }

  mostrar() {
    let estado = "Pendiente";

    if (this.#completada === true) {
      estado = "Completada";
    }

    console.log(`ID: ${this.#id} | ${this.#titulo} | ${estado}`);
  }
}

/* ********************* CLASE LISTA TAREAS ********************/

// Se encarga de guardar y administrar todas las tareas.
// Reemplaza al array "tareas" y a la variable "nextId" que en la
// versión con funciones eran globales y cualquiera podía modificar.

class ListaTareas {
  #listado;
  #nextId;

  constructor() {
    this.#listado = [];
    this.#nextId = 1;
  }

  agregarTarea(titulo) {
    if (titulo === null || titulo === "") {
      console.log("No se agregó la tarea. El título no puede estar vacío.");
    } else {
      const nuevaTarea = new Tarea(this.#nextId, titulo);

      this.#listado.push(nuevaTarea);
      this.#nextId = this.#nextId + 1;
      console.log("Tarea agregada.");
    }
  }

  // Recibe cualquier lista de tareas y le pide a cada una que se muestre.
  imprimir(listaDeTareas) {
    if (listaDeTareas.length === 0) {
      console.log("No hay tareas para mostrar.");
    } else {
      listaDeTareas.forEach(function (tarea) {
        tarea.mostrar();
      });
    }
  }

  mostrarTareas() {
    this.imprimir(this.#listado);
  }

  mostrarTareasPendientes() {
    const tareasPendientes = this.#listado.filter(function (tarea) {
      return tarea.completada === false;
    });

    this.imprimir(tareasPendientes);
  }

  mostrarTareasCompletadas() {
    const tareasCompletadas = this.#listado.filter(function (tarea) {
      return tarea.completada === true;
    });

    this.imprimir(tareasCompletadas);
  }

  completarTarea(idTarea) {
    let tareaEncontrada = false;

    for (let i = 0; i < this.#listado.length; i++) {
      const tarea = this.#listado[i];

      if (tarea.id === idTarea) {
        tareaEncontrada = true;

        if (tarea.completada === true) {
          console.log("La tarea ya estaba completada.");
        } else {
          tarea.completar();
          console.log("Tarea marcada como completada.");
        }
      }
    }

    if (tareaEncontrada === false) {
      console.log("No se encontró una tarea con ese ID.");
    }
  }

  eliminarTarea(idTarea) {
    const cantidadInicial = this.#listado.length;

    this.#listado = this.#listado.filter(function (tarea) {
      return tarea.id !== idTarea;
    });

    if (this.#listado.length < cantidadInicial) {
      console.log("Tarea eliminada.");
    } else {
      console.log("No se encontró una tarea con ese ID.");
    }
  }
}

/* ************************ PROGRAMA ***************************/

const misTareas = new ListaTareas();

misTareas.agregarTarea("Lavar ropa");
misTareas.agregarTarea("Estudiar");
misTareas.agregarTarea("Trabajar");

let continuar = true;

while (continuar === true) {
  let opcion = prompt(
    "APLICACIÓN DE TAREAS\n" +
      "1. Ver todas las tareas\n" +
      "2. Agregar una tarea\n" +
      "3. Completar una tarea\n" +
      "4. Eliminar una tarea\n" +
      "5. Ver tareas pendientes\n" +
      "6. Ver tareas completadas\n" +
      "0. Salir",
  );

  if (opcion === null || opcion === "0") {
    continuar = false;
    console.log("Aplicación finalizada.");
  } else if (opcion === "1") {
    misTareas.mostrarTareas();
  } else if (opcion === "2") {
    let titulo = prompt("Escribí el nombre de la tarea:");
    misTareas.agregarTarea(titulo);
  } else if (opcion === "3") {
    let idIngresado = prompt("Ingresá el ID de la tarea que completaste:");

    if (idIngresado === null) {
      console.log("Operación cancelada.");
    } else {
      misTareas.completarTarea(Number(idIngresado));
    }
  } else if (opcion === "4") {
    let idIngresado = prompt("Ingresá el ID de la tarea que querés eliminar:");

    if (idIngresado === null) {
      console.log("Operación cancelada.");
    } else {
      misTareas.eliminarTarea(Number(idIngresado));
    }
  } else if (opcion === "5") {
    misTareas.mostrarTareasPendientes();
  } else if (opcion === "6") {
    misTareas.mostrarTareasCompletadas();
  } else {
    console.log("Opción no válida. Elegí una opción del menú.");
  }
}
