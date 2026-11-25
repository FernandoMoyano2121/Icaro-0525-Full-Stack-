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

  const resultado = document.getElementById("resultado");
  resultado.textContent = `Nombre : ${nombre}\n Email : ${email}`;

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

/*********************** E-COMMERCE *****************************/

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

// --------------------------------------------------------------------------

/********************* ECOMMERCE OPCIÓN 3 *********************************/

/* Los productos ya no están escritos en el HTML: se generan desde un array.
   Para usarla: comentá la sección ECCOMERCE de arriba y descomentá esta. */

// Fuente de verdad: los datos viven en JS (más adelante vendrán de una API)
const productos = [
  {
    id: 1,
    nombre: "Mouse",
    precio: 30000,
    imagen: "https://placehold.co/100x100",
  },
  {
    id: 2,
    nombre: "Auriculares",
    precio: 100000,
    imagen: "https://placehold.co/100x100",
  },
];

// Identificamos los contenedores vacíos del HTML
const contenedorProductos = document.getElementById("contenedorProductos");
const listaCarrito = document.getElementById("listaCompras");

// Función que agrega un producto al carrito
function agregarAlCarrito(producto) {
  const item = document.createElement("li");
  item.textContent = `${producto.nombre} - $${producto.precio.toLocaleString("es-AR")}`;
  listaCarrito.appendChild(item);
}

// Recorremos el array y creamos una tarjeta por cada producto
productos.forEach((producto) => {
  // Creamos la tarjeta
  const card = document.createElement("div");
  card.className = "producto";

  // Armamos su contenido a partir de los datos del objeto
  card.innerHTML = `
    <img src="${producto.imagen}" alt="${producto.nombre}" />
    <h3>${producto.nombre}</h3>
    <p>Precio: $${producto.precio.toLocaleString("es-AR")}</p>
    <button>Agregar</button>
  `;

  // Escuchamos el click del botón de ESTA tarjeta.
  // Gracias al closure, la función "recuerda" el objeto producto completo:
  // no hace falta guardar nada en data-attributes.
  card.querySelector("button").addEventListener("click", () => {
    agregarAlCarrito(producto);
  });

  // Insertamos la tarjeta en el DOM
  contenedorProductos.appendChild(card);
});
