//-------------------------------------------------------------
//                  OBJETOS LITERALES
//-------------------------------------------------------------

const persona = {
  nombre: "Mariana",
  edad: 30,
  profesion: "Administrativa",

  saludar: function () {
    console.log(`Hola mi nombre es ${this.nombre}`);
    console.log(this);
  },

  /*   saludar: () => {
    console.log(`Hola mi nombre es ${this.nombre}`);
    console.log(this);
  }, */
};

//accediendo a los valores de las claves
console.log(persona.nombre);
console.log(persona.edad);
console.log(persona["profesion"]);

//asignando un nuevo valor
persona.nombre = "Fernando";
persona.saludar();

//accediendo solo a las claves
console.log(Object.keys(persona));
//accediendo solo a los valores
console.log(Object.values(persona));

/* ****************** FOR OF *********************************/
const nombres = ["Fernando", "Mariana", "Alvaro"];

for (let nombre of nombres) {
  console.log(nombre);
}

/* ********************* FOR IN ****************************/
for (let clave in persona) {
  console.log(`${clave} : ${persona[clave]}`);
}

console.log(Object.entries(persona));

/* ********************************************************
Crear un objeto mascota con las siguientes propiedades:
nombre
edad
energía

Y los siguientes métodos:
Cumplir Años: Debe aumentar en 1 la edad
Descansar: Debe aumentar la energía en 1 por cada hora que duerme
Comer: Debe aumentar la energía en 1 por cada 200g de comida
Pasear: Debe bajar la energía en 1 por cada hora que pasea
Adoptar: Debe asignarle un nombre nuevo a la mascota
**************************************************************/

const mascota = {
  nombre: "",
  edad: 1,
  energia: 2,
  medicamentos: ["abc", "sdf", "dfs"],

  /**
   * Description función que aumentar la energía
   * en 1 por cada hora que duerme
   * @param {number} horas
   */
  descansar: function (horas) {
    this.energia += horas;
  },

  /**
   * Description: función que aumenta
   * la energía en 1 por cada 200g de comida
   * @param {number} gramos
   */
  comer: function (gramos) {
    this.energia += gramos / 200;
  },

  /**
   * Description: funcion que baja la energía
   * en 1 por cada hora que pasea
   * @param {number} horasDePaseo
   */
  pasear: function (horasDePaseo) {
    this.energia -= horasDePaseo;
  },

  /**
   * Description función que asigna un
   * nombre nuevo a la mascota
   * @param {string} nuevoNombre
   */
  adoptar: function (nuevoNombre) {
    this.nombre = nuevoNombre;
  },

  recetarMedicacion: function (nombreDeMedicacion) {
    this.medicamentos.push(nombreDeMedicacion);
  },

  verMedicamentos: function () {
    mascota.medicamentos.forEach((medicamento) => console.log(medicamento));
  },
};

//1
mascota.adoptar("Messi");
console.log(mascota.nombre);

//2
mascota.comer(800);
console.log(mascota.energia);

//3
mascota.descansar(10);
console.log(mascota.energia);

//4 Agregar una nueva propiedad
mascota.vacunado = true;
console.log(mascota);

//5
mascota.verMedicamentos();

//------------------------------------------------------
//                Aplicacion de Tareas
//------------------------------------------------------
/* const tarea = {
  id: 1,
  titulo: "Lavar ropa",
  completad: false,
}; */

let tareas = [
  {
    id: 1,
    titulo: "Lavar ropa",
    completada: false,
  },
  {
    id: 2,
    titulo: "Estudiar",
    completada: false,
  },
  {
    id: 3,
    titulo: "Trabajar",
    completada: false,
  },
];

let nextId = 4;

function agregarTarea() {
  let titulo = prompt("Escribí el nombre de la tarea:");

  if (titulo === null || titulo === "") {
    console.log("No se agregó la tarea. El título no puede estar vacío.");
  } else {
    let nuevaTarea = {
      id: nextId,
      titulo: titulo,
      completada: false,
    };

    tareas.push(nuevaTarea);
    nextId = nextId + 1;
    console.log("Tarea agregada.");
  }
}

function mostrarTareas(listaDeTareas) {
  if (listaDeTareas.length === 0) {
    console.log("No hay tareas para mostrar.");
  } else {
    listaDeTareas.forEach(function (tarea) {
      let estado = "Pendiente";

      if (tarea.completada === true) {
        estado = "Completada";
      }

      console.log("ID: " + tarea.id + " | " + tarea.titulo + " | " + estado);
    });
  }
}

function mostrarTareasPendientes() {
  let tareasPendientes = tareas.filter(function (tarea) {
    if (tarea.completada === false) {
      return true;
    }

    return false;
  });

  mostrarTareas(tareasPendientes);
}

function mostrarTareasCompletadas() {
  let tareasCompletadas = tareas.filter(function (tarea) {
    if (tarea.completada === true) {
      return true;
    }

    return false;
  });

  mostrarTareas(tareasCompletadas);
}

function completarTarea() {
  let idIngresado = prompt("Ingresá el ID de la tarea que completaste:");

  if (idIngresado === null) {
    console.log("Operación cancelada.");
    return;
  }

  let idTarea = Number(idIngresado);
  let tareaEncontrada = false;

  for (let i = 0; i < tareas.length; i++) {
    if (tareas[i].id === idTarea) {
      tareaEncontrada = true;

      if (tareas[i].completada === true) {
        console.log("La tarea ya estaba completada.");
      } else {
        tareas[i].completada = true;
        console.log("Tarea marcada como completada.");
      }
    }
  }

  if (tareaEncontrada === false) {
    console.log("No se encontró una tarea con ese ID.");
  }
}

function eliminarTarea() {
  let idIngresado = prompt("Ingresá el ID de la tarea que querés eliminar:");

  if (idIngresado === null) {
    console.log("Operación cancelada.");
    return;
  }

  let idTarea = Number(idIngresado);
  let cantidadInicial = tareas.length;

  tareas = tareas.filter(function (tarea) {
    if (tarea.id === idTarea) {
      return false;
    }

    return true;
  });

  if (tareas.length < cantidadInicial) {
    console.log("Tarea eliminada.");
  } else {
    console.log("No se encontró una tarea con ese ID.");
  }
}

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
      "0. Salir"
  );

  if (opcion === null || opcion === "0") {
    continuar = false;
    console.log("Aplicación finalizada.");
  } else if (opcion === "1") {
    mostrarTareas(tareas);
  } else if (opcion === "2") {
    agregarTarea();
  } else if (opcion === "3") {
    completarTarea();
  } else if (opcion === "4") {
    eliminarTarea();
  } else if (opcion === "5") {
    mostrarTareasPendientes();
  } else if (opcion === "6") {
    mostrarTareasCompletadas();
  } else {
    console.log("Opción no válida. Elegí una opción del menú.");
  }
}
