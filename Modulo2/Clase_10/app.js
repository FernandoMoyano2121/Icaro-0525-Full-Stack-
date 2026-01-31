//declaración
let lapicera;

//Inicialización
lapicera = "lapicera";

let nombre = "Fernando"; //string (cadena de texto)
//let edad = 34; //númerico
let esMayor = true; //valor boleano
let indefinido = undefined;
let nulo = null;

//edad = 35;
// let edad -> 🔴No se puede volver a declarar la variable con ámbito de bloque 'edad'

//const tuNombre 🔴Las declaraciones “const” deben inicializarse.;
/* const tuNombre = "Mariana";
tuNombre = "David"; */

/* OPERADORES */

//= Asignación
//+ adición
//- Sustracción
//* Multiplicación
/// División

//OPERADORS LOGICOS
// && "Y"
// || "O"
let precioTotal = 5 + 8; //= 13

let x = 18;

x = x + 1; //19
x += 1;

//COMENTARIOS
// Una linea
/* Comentario multilinea*/

//FUNCIONES

//identificador(informacionExtra)
//ALERT()
/* alert("Hola Alumnos!! "); */

//CONSOLE.LOG()

/* console.log("Chau alumnos!!");
console.log(34);
console.log(5 + 10); */

//CONFIRM
/* let quiereEstudiar = confirm("Estás listo para aprender Javascript?");
console.log(quiereEstudiar); */

/*
 si el alumno quiereEstudiar 
  Le proporcion el material extra
 */

//console.log(prompt("Ingresa tu edad"));

/* let edad = prompt("Ingresa tu edad");
console.log(edad); */

let primerNumero = parseInt(prompt("Ingresa el primer numero"));
let segundoNumero = parseInt(prompt("Ingresa el segundo numero"));

let suma = primerNumero + segundoNumero;
let resta = primerNumero - segundoNumero;
let multiplicacion = primerNumero * segundoNumero;
let division = primerNumero / segundoNumero;
//"10"    +     "20"
console.log(suma);
console.log(resta);
console.log(multiplicacion);
console.log(division);
