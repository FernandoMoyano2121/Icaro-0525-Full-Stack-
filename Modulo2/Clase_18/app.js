/* NODO RAIZ - OBJETO PADRE */
console.log(document.body);

/* getElementById() */

const titulo1 = document.getElementById("titulo");
console.log(titulo1);

/* getElementByTagName() */

const h1 = document.getElementsByTagName("h3");
console.log(h1);

/* getElementsByClassName() */

const parrafo = document.getElementsByClassName("parrafo");
console.log(parrafo);

/* querySelector() */

const div1 = document.querySelector("div");
const div2 = document.querySelector("#div");
const div3 = document.querySelector(".div");
console.log(div1);
console.log(div2);
console.log(div3);

/* MANIPULACION DE CONTENIDO */

const titulo2 = document.getElementById("titulo");
console.log(titulo2);

/* Rescatar texto */
console.log(titulo2.textContent);

/* Insertar Texto */
titulo2.textContent = "lorem lorem lorem";

const texto = document.getElementById("texto");
texto.innerHTML = " <h1 class=texto>Hola Alumnos! </h1>";

/* *****************ejemplo final *****************/

const titulo = document.getElementById("titulo");
const descripcion = document.getElementsByClassName(".descripcion");
const img = document.querySelector("img");

titulo.textContent = "Modificando texto del titulo";
descripcion.innerHTML = "<strong>Agregando etiqueta strong</strong>";

img.setAttribute("src", "./img/imagen1.jpg");
