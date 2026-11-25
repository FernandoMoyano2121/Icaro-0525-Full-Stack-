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

/* ******************* [ES6+] MÓDULOS ***********************

  Hoy todo vive en un solo archivo. Con módulos lo separaríamos así:

    tarea.js        -> export class Tarea { ... }
    listaTareas.js  -> import { Tarea } from "./tarea.js";
                       export class ListaTareas { ... }
    main.js         -> import { ListaTareas } from "./listaTareas.js";
                       (acá va el PROGRAMA con el menú)

  Y en el index.html:
    <script type="module" src="./main.js"></script>

  Detalle importante: main.js NO importa Tarea. Solo conoce a
  ListaTareas, que es la única que crea tareas (composición).
  Así los módulos también nos ayudan a encapsular.


*************************************************************/

/* ************************ CLASE TAREA ************************/
// Molde para crear cada tarea.
// Sus propiedades son privadas (#): desde afuera solo se pueden
// leer con los getters o modificar con los métodos de la clase.
// [ES6+] ENCAPSULAMIENTO: esto ya es encapsulamiento. Los campos #
//        no se pueden leer ni modificar desde afuera de la clase.
// [ES6+] MÓDULOS: en tarea.js esta línea sería -> export class Tarea {

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

  // Ya no muestra nada: DEVUELVE el texto de la tarea.
  // Así quien la llama decide dónde mostrarlo (alert, consola, etc.).
  obtenerDescripcion() {
    // [ES6+] LET: usamos let (y no const) porque "estado" se reasigna abajo.
    let estado = "Pendiente";

    if (this.#completada === true) {
      estado = "Completada";
    }

    // [ES6+] TEMPLATE STRING: con backticks y ${} insertamos los valores
    //        sin concatenar. Versión vieja:
    // return "ID: " + this.#id + " | " + this.#titulo + " | " + estado;
    return `ID: ${this.#id} | ${this.#titulo} | ${estado}`;
  }
}

/* ************* [ES6+] HERENCIA Y POLIMORFISMO ****************

  Opcional: una tarea con fecha de vencimiento ES UNA Tarea,
  así que puede heredar de ella (extends).

  Ojo: la clase hija NO puede leer los # del padre (#titulo,
  #completada...). Tiene que usar los getters (this.titulo, etc.).
  
  Por eso el encapsulamiento se mantiene intacto.

class TareaConFecha extends Tarea {
  #fechaVencimiento; // privado y sin setter, igual que en Tarea

  constructor(id, titulo, fechaVencimiento) {
    super(id, titulo); // HERENCIA: llamamos al constructor del padre
    this.#fechaVencimiento = fechaVencimiento;
  }

  // POLIMORFISMO: mismo nombre de método que en Tarea, pero se
  // comporta distinto. imprimir() llama a tarea.obtenerDescripcion()
  // sin saber si es Tarea o TareaConFecha, y cada una arma su texto.
  obtenerDescripcion() {
    // super.obtenerDescripcion() reutiliza el texto del padre
    return `${super.obtenerDescripcion()} | Vence: ${this.#fechaVencimiento}`;
  }
}

  Para usarla, ListaTareas tendría que crearla en un método propio
  (por ejemplo agregarTareaConFecha(titulo, fecha)), así se respeta
  la composición: la lista sigue siendo la única que crea tareas.

*************************************************************/

/* ********************* CLASE LISTA TAREAS ********************/

// Se encarga de guardar y administrar todas las tareas.
// Reemplaza al array "tareas" y a la variable "nextId" que en la
// versión con funciones eran globales y cualquiera podía modificar.
// [ES6+] ENCAPSULAMIENTO: #listado y #nextId son privados. Nadie de
//        afuera puede vaciar la lista ni cambiar el próximo ID.
// [ES6+] MÓDULOS: en listaTareas.js arriba iría
//        -> import { Tarea } from "./tarea.js";
//        y esta línea sería -> export class ListaTareas {

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

      // [ES6+] CONST: nuevaTarea no se reasigna, por eso es const.
      // [ES6+] SPREAD: otra forma de agregar es crear un array nuevo con
      //        lo que ya había (...this.#listado) más la tarea nueva:
      // this.#listado = [...this.#listado, nuevaTarea];
      this.#listado.push(nuevaTarea);
      this.#nextId = this.#nextId + 1;
      console.log("Tarea agregada.");
    }
  }

  // Recibe cualquier lista de tareas, junta el texto de cada una
  // y lo muestra todo junto en UN solo alert.
  imprimir(listaDeTareas) {
    if (listaDeTareas.length === 0) {
      alert("No hay tareas para mostrar.");
    } else {
      // [ES6+] LET: "texto" va creciendo en cada vuelta, por eso es let.
      let texto = "LISTADO DE TAREAS\n\n";

      // [ES6+] POLIMORFISMO: si en la lista hubiera una TareaConFecha,
      //        acá se usaría SU obtenerDescripcion() sin cambiar nada.
      listaDeTareas.forEach(function (tarea) {
        texto = texto + tarea.obtenerDescripcion() + "\n";
      });
      // [ES6+] ARROW FUNCTION + TEMPLATE STRING:
      // listaDeTareas.forEach((tarea) => {
      //   texto += `${tarea.obtenerDescripcion()}\n`;
      // });

      alert(texto);
    }
  }

  mostrarTareas() {
    this.imprimir(this.#listado);
  }

  mostrarTareasPendientes() {
    const tareasPendientes = this.#listado.filter(function (tarea) {
      return tarea.completada === false;
    });
    // [ES6+] ARROW FUNCTION: con una sola expresión el return es implícito:
    // const tareasPendientes = this.#listado.filter((tarea) => !tarea.completada);

    this.imprimir(tareasPendientes);
  }

  mostrarTareasCompletadas() {
    const tareasCompletadas = this.#listado.filter(function (tarea) {
      return tarea.completada === true;
    });
    // [ES6+] ARROW FUNCTION:
    // const tareasCompletadas = this.#listado.filter((tarea) => tarea.completada);

    this.imprimir(tareasCompletadas);
  }

  completarTarea(idTarea) {
    let tareaEncontrada = false;

    for (let i = 0; i < this.#listado.length; i++) {
      const tarea = this.#listado[i];

      // [ES6+] DESESTRUCTURACIÓN DE OBJETOS: sacamos id y completada de
      //        la tarea (funciona con los getters, no con los #):
      // const { id, completada } = tarea;
      // if (id === idTarea) { ... if (completada === true) { ... } }
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
    // [ES6+] ARROW FUNCTION:
    // this.#listado = this.#listado.filter((tarea) => tarea.id !== idTarea);

    if (this.#listado.length < cantidadInicial) {
      console.log("Tarea eliminada.");
    } else {
      console.log("No se encontró una tarea con ese ID.");
    }
  }

  /* [ES6+] SPREAD + ENCAPSULAMIENTO: si alguien de afuera necesitara
     leer las tareas, devolvemos una COPIA con spread y no el array real.
     Así pueden recorrerla, pero no agregar ni borrar tareas de #listado.
     (Nunca hagas "return this.#listado": rompería el encapsulamiento.)

  obtenerTareas() {
    return [...this.#listado];
  }
  */

  /* [ES6+] DESESTRUCTURACIÓN DE ARRAYS: un método que devuelve dos
     valores dentro de un array. Se usa abajo, en el PROGRAMA.

  contarTareas() {
    const pendientes = this.#listado.filter((tarea) => !tarea.completada);
    const completadas = this.#listado.filter((tarea) => tarea.completada);
    return [pendientes.length, completadas.length];
  }
  */
}

/* ************************ PROGRAMA ***************************/
// [ES6+] MÓDULOS: en main.js arriba iría
//        -> import { ListaTareas } from "./listaTareas.js";

// [ES6+] CONST: misTareas siempre apunta a la misma lista, por eso es const.
//        (Podemos agregarle tareas igual: const impide reasignar la
//        variable, no modificar el objeto.)
const misTareas = new ListaTareas();

misTareas.agregarTarea("Lavar ropa");
misTareas.agregarTarea("Estudiar");
misTareas.agregarTarea("Trabajar");

// [ES6+] DESESTRUCTURACIÓN DE ARRAYS (si activás contarTareas()):
// const [cantPendientes, cantCompletadas] = misTareas.contarTareas();
// console.log(`Pendientes: ${cantPendientes} | Completadas: ${cantCompletadas}`);

// [ES6+] LET: continuar cambia a false para salir del menú, por eso es let.
let continuar = true;

while (continuar === true) {
  // [ES6+] CONST: opcion no se reasigna dentro de cada vuelta del while,
  //        así que podría ser const (en cada vuelta se crea una nueva).

  // [ES6+] TEMPLATE STRING: el menú se puede escribir en varias líneas
  //        sin \n ni +:
  // const opcion = prompt(`APLICACIÓN DE TAREAS
  // 1. Ver todas las tareas
  // 2. Agregar una tarea
  // 3. Completar una tarea
  // 4. Eliminar una tarea
  // 5. Ver tareas pendientes
  // 6. Ver tareas completadas
  // 0. Salir`);
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
    // [ES6+] CONST: titulo no se reasigna -> const titulo = prompt(...)
    let titulo = prompt("Escribí el nombre de la tarea:");
    misTareas.agregarTarea(titulo);
  } else if (opcion === "3") {
    // [ES6+] CONST: idIngresado no se reasigna -> const idIngresado = prompt(...)
    let idIngresado = prompt("Ingresá el ID de la tarea que completaste:");

    if (idIngresado === null) {
      console.log("Operación cancelada.");
    } else {
      misTareas.completarTarea(Number(idIngresado));
    }
  } else if (opcion === "4") {
    // [ES6+] CONST: idem -> const idIngresado = prompt(...)
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
