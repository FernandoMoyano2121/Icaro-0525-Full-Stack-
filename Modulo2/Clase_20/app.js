const parrafo = document.querySelector("p");
console.log(parrafo.nodeType); //1 -> (ELEMENT-NODE)

console.log(parrafo.firstChild.nodeType); //3 -> (TEXT-NODE)

/* *****************CREANDO ELEMENTO ***********************/
/*
  document.createElement(tagName)
    - Recibe: un string con el nombre de la etiqueta ("p", "div", "h1"...).
    - Retorna: el nuevo elemento HTML creado (todavía no está en la página).

  document.getElementById(id)
    - Recibe: un string con el id del elemento (sin el #).
    - Retorna: el elemento con ese id, o null si no existe.

  elemento.textContent = "texto"
    - Es una propiedad, no un método: al asignarle un string reemplaza el texto del elemento.

  elemento.classList.add(clase1, clase2, ...)
    - Recibe: uno o más strings con nombres de clases.
    - Retorna: undefined (solo agrega las clases al elemento).

  padre.appendChild(nodoHijo)
    - Recibe: el nodo que queremos insertar como último hijo del padre.
    - Retorna: el mismo nodo que se agregó.
*/

const p = document.createElement("p");
const contenedor = document.getElementById("contenedor");
/* Crear texto para parrafo */
p.textContent = "Texto de mi parrafo";
p.classList.add("parrafo");
contenedor.appendChild(p);

/* ***************** CLONAR ELEMENTO ******************/
/*
  nodo.cloneNode(deep)
    - Recibe: un booleano (opcional, por defecto false).
        true  -> copia el nodo con todos sus hijos (incluido el texto).
        false -> copia solo el nodo, vacío.
    - Retorna: la copia del nodo (hay que insertarla con appendChild para que se vea).
*/

const parrafoClonaado = p.cloneNode(true);
contenedor.appendChild(parrafoClonaado);

/* **************** ELIMINAR NODO HIJO ***************/
/*
  padre.removeChild(nodoHijo)
    - Recibe: el nodo hijo que queremos quitar (debe ser hijo directo del padre).
    - Retorna: el nodo eliminado (sale de la página pero sigue existiendo en memoria).
*/

//document.body.removeChild(contenedor);
contenedor.removeChild(parrafoClonaado);
contenedor.removeChild(p);

document.createElement("div");
document.createElement("p");
document.createElement("h1");

/* **************** INSERTAR ANTES DE UN NODO ***************/
/*
  padre.insertBefore(nuevoNodo, nodoReferencia)
    - Recibe:
        nuevoNodo      -> el nodo que queremos insertar.
        nodoReferencia -> el hijo del padre ANTES del cual se va a insertar.
                          Si es null, se inserta al final (igual que appendChild).
    - Retorna: el nodo insertado (nuevoNodo).
*/

const titulo = document.createElement("h1");
titulo.textContent = "Título insertado con insertBefore";
// El padre es body y la referencia es el contenedor: el h1 queda justo antes del div
document.body.insertBefore(titulo, contenedor);
