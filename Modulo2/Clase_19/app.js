/* ********************* EVENTO CLICK **************************/

/* function saludar() {
  alert("Hola Alumnos");
}

const button = document.getElementById("button");
button.addEventListener("click", saludar); */

/* const button = document.getElementById("button");
button.addEventListener("click", () => alert("Hola alumnos")); */

const button = document.getElementById("button");
button.addEventListener("click", (evento) => console.log(evento));

/* ************************ EVENTO INPUT **********************/

const input = document.getElementById("input");

input.addEventListener("input", (evento) => {
  console.log(`Informacion ingresada por el usuario: ${evento.target.value}`);
});

/* ******************** EVENTO MOUSEOVER *************************/

/* const div = document.getElementById("div");

function mouseOver() {
  console.log("Pasando por encima del div");
}

div.addEventListener("mouseover", mouseOver); */

/* **************** PREVENTDEFAULT() *********************/

const formulario = document.getElementById("miFormulario");

formulario.addEventListener("submit", (evento) => {
  // 🔴 Evita que el navegador recargue la página
  evento.preventDefault();
  const datos = new FormData(formulario);
  const nombre = datos.get("nombre");
  const email = datos.get("email");

  /*
  const resultado = document.getElementById("resultado");
  resultado.textContent = `Nombre : ${nombre}\n Email : ${email}`;
  */

  /* ***********************innerHTML ********************/

  /*
     document.getElementById("resultado").innerHTML = `
     <div class="resultado">
      <div>Nombre : ${nombre}</div>
      <div>Email : ${email}</div>
    </div>`; 
  */

  /* ******************textContent ***********************/

  const dataNombre = document.getElementById("dataNombre");
  const dataEmail = document.getElementById("dataEmail");

  dataNombre.textContent = nombre;
  dataEmail.textContent = email;
});

/*********************** ECCOMERCE *****************************/

/* Identificamos elementos HTML */
const botones = document.querySelectorAll(".btnComprar");
const lista = document.getElementById("listaCompras");

/* Recorrer todoso los botones con la clase btnComprar */
botones.forEach((boton) => {
  /* a cada botón le asignamos la escucha de eventos */
  boton.addEventListener("click", () => {
    /* extraemos el nombre del data-attribute */
    const nombreProducto = boton.dataset.nombre;
    /* Creacion de el item de lista */
    const item = document.createElement("li");
    /* asignamos como nombre del item el valor del data-attribute */
    item.textContent = nombreProducto;
    /* Insertamos nodo al DOM */
    lista.appendChild(item);
  });
});
