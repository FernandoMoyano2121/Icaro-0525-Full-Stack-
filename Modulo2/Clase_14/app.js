// []

const miArray = [1, 2, 3, 4, 5, 6];
const letras = ["a", "b", "c", "d"];

console.log(miArray);
console.log(letras);

/* Cantidad de elementos de mi Array */
console.log(miArray.length);

console.log(letras[1]);

const letraB = letras[1];
console.log(letraB);

for (let index = 0; index < miArray.length; index++) {
  console.log(miArray[index]);
}

//----------------------------------------------------------
//                          FOR OF
//----------------------------------------------------------

for (let letra of letras) {
  console.log(letra);
}

const nombres = ["Fernando", "Luciano", "Celina", "Victoria"];

//----------------------------------------------------------
//                          PUSH()
//----------------------------------------------------------

const nuevaLongitud = nombres.push("Emiliano");
console.log(nuevaLongitud);

//----------------------------------------------------------
//                          POP()
//----------------------------------------------------------

const nombreEliminado = nombres.pop();
console.log(nombreEliminado);

//----------------------------------------------------------
//                          SHIFT()
//----------------------------------------------------------

const primerNombreEliminado = nombres.shift();
console.log(primerNombreEliminado);

//--------------------------------------------------------
//                        UNSHIFT()
//--------------------------------------------------------

const nuevaLongitudDeMiArray = nombres.unshift("Guillermo");
console.log(nuevaLongitudDeMiArray);
console.log(nombres);

//------------------------------------------------------
//                       SPLICE()
//------------------------------------------------------

const elementoRemovido = nombres.splice(1, 1);
console.log(elementoRemovido);

//---------------------------------------------------------
//                         CONCAT()
//---------------------------------------------------------

const listadoDeNombres1 = ["Pedro", "Martin"];
const listadoDeNombres2 = ["Juan", "Fernando"];

console.log(listadoDeNombres1.concat(listadoDeNombres2));

const listadoDeNombres3 = listadoDeNombres1.concat(listadoDeNombres2);
console.log(listadoDeNombres3);

//---------------------------------------------------------
//                         JOIN()
//--------------------------------------------------------

const nuevoSeparador = nombres.join(" ");
console.log(nuevoSeparador);

//------------------------------------------------------------
//              FUNCIONES DE ORDEN SUPERIOR
//------------------------------------------------------------

function sumar(a, b) {
  return a + b;
}

function restar(a, b) {
  return a - b;
}

function operar(a, b, fn) {
  return fn(a, b);
}

operar(5, 8, sumar);

//-------------------------------------------------------
//                          FOREACH()
//--------------------------------------------------------

nombres.forEach((nombre) => console.log(nombre2));

//----------------------------------------------------------
//                        FIND()
//----------------------------------------------------------

const misNumeros = [1, 2, 3, 4, 5, 6, 7];

const numeroMayorACinco = misNumeros.find((numero) => numero > 5);
console.log(numeroMayorACinco);

/* Con strings */
const nombreFemenino = nombres.find((nombre) => nombre === "Victoria");
console.log(nombreFemenino);

//------------------------------------------------------------
//                        FILTER()
//------------------------------------------------------------

const numerosMayoresACinco = misNumeros.filter((elemento) => elemento > 5);
console.log(numerosMayoresACinco);

//------------------------------------------------------------
//                           MAP()
//------------------------------------------------------------

const misNumerosMultiplicados = misNumeros.map((numero) => numero * 2);
console.log(misNumerosMultiplicados);

/* ---------------------------------------------------- */

/* const miArray = [];
const numero = parseInt(prompt("Por favor ingresa un numero"));

miArray.push(numero);

const MiArrayMultiplicado = miArray.map((elemento) => elemento * 2); */

/* -------------------------------------------------------- */

const ListadoDeParticipantes = [];
let totalDeParticipantes = 5;

const main = () => {
  do {
    //1. PEDIR NOMBRE
    let nombre = pedirNombre("Por favor ingresa un participante");

    //2. CHEQUEAR QUE NO SEA NULL
    if (nombre == null) {
      alert("Entrada cancelada");
    }

    //3. AGREGAR PARTICIPANTE A LA LISTA
    agregarParticipante(nombre);

    //4. RESTAR PARTICIPANTE DEL TOTAL PERMITIDO
    totalDeParticipantes--;

    const listado = mostrarParticipantes(ListadoDeParticipantes);
    alert(listado);
  } while (totalDeParticipantes > 0);
};

/**
 * funcion que pide un nombre
 * @param {string} mensaje
 * @returns un prompt para capturar la entrada del usuario
 */
function pedirNombre(mensaje) {
  return prompt(mensaje);
}

/**
 *@description Funcion que agrega un participante
 * @param {string} participante
 */
function agregarParticipante(participante) {
  ListadoDeParticipantes.push(participante);
}

/**
 *
 * @param {Array} listado
 * @returns {Array} listado de participantes
 */
function mostrarParticipantes(listado) {
  if (listado.length === 0) {
    alert("Aun no hay participantes");
  }
  return listado.join("\n");
}

function EliminarUsuario() {
  const participante = prompt("Ingresa el participante a eliminar");

  //finIndex() // Retorna el indice del elemento que cumpla con la condicion
  indiceDelUsuarioAEliminar = ListadoDeParticipantes.findIndex(
    (p) => p === participante,
  );
  ListadoDeParticipantes.splice(indiceDelUsuarioAEliminar, 1);
}

main();
