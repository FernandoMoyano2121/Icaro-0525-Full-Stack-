const parrafo = document.querySelector("p");
console.log(parrafo.nodeType); //1 -> (ELEMENT-NODE)

console.log(parrafo.firstChild.nodeType); //3 -> (TEXT-NODE)

/* *****************CREANDO ELEMENTO ***********************/

const p = document.createElement("p");
const contenedor = document.getElementById("contenedor");
/* Crear texto para parrafo */
p.textContent = "Texto de mi parrafo";
p.classList.add("parrafo");
contenedor.appendChild(p);

/* ***************** CLONAR ELEMENTO ******************/

const parrafoClonaado = p.cloneNode(true);
contenedor.appendChild(parrafoClonaado);

/* **************** ELIMINAR NODO HIJO ***************/

//document.body.removeChild(contenedor);
contenedor.removeChild(parrafoClonaado);
contenedor.removeChild(p);

document.createElement("div");
document.createElement("p");
document.createElement("h1");
