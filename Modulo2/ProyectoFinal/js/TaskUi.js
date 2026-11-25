/*
  ORDEN ACONSEJADO PARA CREAR LOS METODOS
  (cada paso se puede probar en el navegador antes de seguir)

  1. constructor()        -> Guardar referencias a los elementos del HTML y
                             escuchar el click del boton Agregar.
  2. render()             -> Limpiar el listado y mostrar "Tareas pendientes".
                             Al principio la lista esta vacia: se ve el contador en 0.
  3. crearBoton()         -> Funcion auxiliar chica: crea un <button> con texto y clases.
     crearInfo()          -> Funcion auxiliar: arma el texto de la tarea
                             (nombre, prioridad y vencimiento).
  4. crearItem()          -> Armar el <li> de una tarea (checkbox, info, botones)
                             usando crearInfo() y crearBoton().
                             render() lo llama por cada tarea.
  5. handleAgregar()      -> Leer el formulario, validar y agregar la tarea.
                             (Primero solo la parte del "else": agregar).
  6. handleEliminar()     -> Eliminar la tarea y volver a renderizar.
  7. limpiarFormulario()  -> Dejar el formulario vacio despues de agregar.
  8. cargarParaEdicion()  -> Pasar los datos de una tarea al formulario
                             y activar el modo edicion.
                             Despues se completa el "if (this.tareaEditando)"
                             en handleAgregar() y el reseteo en limpiarFormulario().
*/

export class TaskUi {
  constructor(manager) {
    this.manager = manager;
    this.tareaEditando = null;

    this.inputNombre = document.getElementById("nombreTarea");
    this.selectPrioridad = document.getElementById("prioridadTarea");
    this.inputVencimiento = document.getElementById("fechaVencimiento");
    this.btnAgregar = document.getElementById("agregarTarea");
    this.listado = document.getElementById("listadoTareas");
    this.pendientes = document.getElementById("tareasPendientes");

    this.btnAgregar.addEventListener("click", () => this.handleAgregar());
  }

  handleAgregar() {
    const nombre = this.inputNombre.value.trim();
    const prioridad = this.selectPrioridad.value;
    const vencimiento = this.inputVencimiento.value;

    if (!nombre || !vencimiento) {
      alert("Debes rellenar todos los campos");
      return;
    }

    if (this.tareaEditando) {
      this.manager.editar(this.tareaEditando.id, nombre, prioridad, vencimiento);
    } else {
      this.manager.agregar(nombre, prioridad, vencimiento);
    }

    this.limpiarFormulario();
    this.render();
  }

  handleEliminar(tarea) {
    this.manager.eliminar(tarea.id);

    //Si se elimina la tarea que se esta editando, se sale del modo edicion
    if (this.tareaEditando && this.tareaEditando.id === tarea.id) {
      this.limpiarFormulario();
    }

    this.render();
  }

  cargarParaEdicion(tarea) {
    this.inputNombre.value = tarea.nombre;
    this.selectPrioridad.value = tarea.prioridad;
    this.inputVencimiento.value = tarea.vencimiento;

    this.tareaEditando = tarea;
    this.btnAgregar.textContent = "Guardar Cambios";
  }

  render() {
    this.listado.innerHTML = "";
    this.manager.tareas.forEach((tarea) => {
      this.listado.append(this.crearItem(tarea));
    });
    this.pendientes.textContent = `Tareas pendientes ${this.manager.obtenerPendientes().length}`;
  }

  crearItem(tarea) {
    const item = document.createElement("li");
    item.className =
      "list-group-item d-flex justify-content-around align-items-center";

    //Checkbox para marcar la tarea como completada
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = tarea.completada;
    checkbox.addEventListener("change", () => {
      this.manager.marcarCompletada(tarea.id);
      this.render();
    });

    //Informacion de la tarea
    const info = this.crearInfo(tarea);

    //Botones
    const btnEditar = this.crearBoton("Editar", "btn btn-success");
    btnEditar.addEventListener("click", () => this.cargarParaEdicion(tarea));

    const btnEliminar = this.crearBoton("Eliminar", "btn btn-danger");
    btnEliminar.addEventListener("click", () => this.handleEliminar(tarea));

    item.append(checkbox, info, btnEditar, btnEliminar);
    return item;
  }

  crearInfo(tarea) {
    const info = document.createElement("span");

    const nombre = document.createElement("strong");
    nombre.textContent = tarea.nombre;

    const prioridad = document.createElement("span");
    prioridad.textContent = ` | Prioridad: ${tarea.prioridad} | `;

    const vence = document.createElement("strong");
    vence.textContent = `Vence: ${tarea.vencimiento}`;

    info.append(nombre, prioridad, vence);
    return info;
  }

  crearBoton(texto, clases) {
    const btn = document.createElement("button");
    btn.textContent = texto;
    btn.className = clases;

    return btn;
  }

  limpiarFormulario() {
    this.inputNombre.value = "";
    this.selectPrioridad.value = "Media";
    this.inputVencimiento.value = "";

    this.tareaEditando = null;
    this.btnAgregar.textContent = "Agregar";
  }
}
