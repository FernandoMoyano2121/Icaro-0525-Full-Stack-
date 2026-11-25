//------------------------------------------------------
//                Aplicacion de Tareas
//------------------------------------------------------

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
      "0. Salir",
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
