/* NODO RAIZ - OBJETO PADRE */
console.log(document.body);

/* ***************getElementById() ****************/
/*
Qué hace: busca un elemento por su atributo id.
Parámetros: recibe un texto con el id del elemento, sin el símbolo #.
Retorna: el elemento encontrado o null si no existe.
*/

const titulo1 = document.getElementById("titulo");
console.log(titulo1);

/* *************getElementByTagName() ****************/
/*
Qué hace: busca todos los elementos que tengan la etiqueta indicada.
Parámetros: recibe un texto con el nombre de la etiqueta HTML.
Retorna: una HTMLCollection con los elementos encontrados.
*/

const h1 = document.getElementsByTagName("h3");
console.log(h1);

/* *************getElementsByClassName() *************/
/*
Qué hace: busca todos los elementos que tengan la clase indicada.
Parámetros: recibe un texto con el nombre de la clase, sin el símbolo punto.
Retorna: una HTMLCollection con los elementos encontrados.
*/

const parrafo = document.getElementsByClassName("parrafo");
console.log(parrafo);

/* *****************querySelector() ***************/
/*
Qué hace: busca el primer elemento que coincida con un selector CSS.
Parámetros: recibe un texto con el selector CSS.
Retorna: el primer elemento encontrado o null si no existe.
*/

const div1 = document.querySelector("div");
const div2 = document.querySelector("#div");
const div3 = document.querySelector(".div");
console.log(div1);
console.log(div2);
console.log(div3);

/* **************MANIPULACION DE CONTENIDO *************/

const titulo2 = document.getElementById("titulo");
console.log(titulo2);

/* Rescatar texto */
/*
Qué hace: textContent permite obtener o modificar únicamente el contenido textual.
Parámetros: al asignarlo, recibe el texto que reemplazará al contenido actual.
Retorna: el contenido textual del elemento al leerlo.
*/
console.log(titulo2.textContent);

/* Insertar Texto */
titulo2.textContent = "lorem lorem lorem";

const texto = document.getElementById("texto");
/*
Qué hace: innerHTML permite obtener o modificar el contenido HTML de un elemento.
Parámetros: al asignarlo, recibe una cadena con código HTML.
Retorna: el contenido HTML actual del elemento al leerlo.
*/
texto.innerHTML = " <h1 class=texto>Hola Alumnos! </h1>";

/* *****************ejemplo final *****************/

const titulo = document.getElementById("titulo");
const descripcion = document.getElementsByClassName(".descripcion");
const img = document.querySelector("img");

titulo.textContent = "Modificando texto del titulo";
descripcion.innerHTML = "<strong>Agregando etiqueta strong</strong>";

/*
Qué hace: setAttribute establece o reemplaza el valor de un atributo HTML.
Parámetros: recibe el nombre del atributo y el valor que se le quiere asignar.
Retorna: undefined; modifica el elemento directamente.
*/
img.setAttribute("src", "./img/imagen1.jpg");

const document1 = new Document();
console.log(document1);
