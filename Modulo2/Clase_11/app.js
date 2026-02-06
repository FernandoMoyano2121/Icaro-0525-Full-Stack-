/*

if(condicion){
  codigo a ejecuta...
} 

if(condicion){
  codigo a ejecutar si la condicion es verdadera

}else{
  //codigo a ejecutar si la condicion es falsa
}
  
if(condicion){
  codigo a ejecutar...
}else if(condicion){
  codigo a ejecutar...
}else if(condicion){
  codigo a ejecutar...
}
*/

let edad1 = 18;

if (edad1 < 16) {
  console.log("No podes votar");
} else if (edad1 < 18) {
  console.log("Podes votar pero sos menor de edad");
} else {
  console.log("Sos Mayor de edad , podes votar sin problemas");
}

/* --------------------------------------------------- */

let condicion = true;

if (condicion === true) {
  console.log("entrando en el if");
}

console.log("Continuando despues del if");

/* *************** IGUALDAD  ESTRICTA *****************/

let numero1 = "5";
let numero2 = 5;

console.log(typeof numero1);
console.log(typeof numero2);

if (numero1 !== numero2) {
  console.log("Los valores y los tipos no son iguales");
} else {
  console.log("Los valores y los tipos son iguales");
}

/************  APLICACION DE OPERADORES LOGICOS ************/

let estaRegistrado = true;
let edad2 = 16;

if (estaRegistrado && edad2 > 18) {
  console.log("Acceso permitido");
} else {
  console.log("Acceso denegado");
}

/* ------------------------------------------ */

let tieneLicencia = true;
let edad3 = 18;

if (edad3 >= 18 && tieneLicencia) {
  console.log("Puede conducir");
} else {
  console.log("No puede conducir");
}

/* **************ESTRUCTURA OPERADOR TERNARIO ***************/

/*
 condicion ? valor_si_verdadero : valor_si_falso
*/

/* ******************OPERADOR TERNARIO ********************/

let edad4 = 18;
let mensaje = edad4 >= 18 ? "sos mayor" : "Eres menor de edad";
console.log(mensaje);

/* MISMO CASO CON ESTRUCTURA CONVENCIONAL*/

if (edad4 >= 18) {
  console.log("sos Mayor");
} else {
  console.log("Eres menor de edad");
}

/* ******************* ESTRUCTURA SWITCH **********************/

switch (expresion) {
  case valor1:
    //codigo a ejecutar
    break;
  case valor2:
    //codigo a ejecutar
    break;
  default:
  //codigo a ejecutar si no se cumple con los casos previos
}

/* ******************* EJERCICIO SWITCH **********************/

let dia = "Lunes";

switch (dia) {
  case "Lunes":
    console.log("Comenzando la semana ");
    break;
  case "Miercoles":
    console.log("estámos a mitad de semana");
    break;
  case "Domingo":
    console.log("Fin de semana");
    break;
  default:
    console.log("es un dia más");
}

/* -----------------------------EJERCITACION------------------------------- */

/*
 Crear un script que valide los datos ingresados por un usuario .

Instrucciones:
- Pide al usuario su edad y si tiene licencia de conducir
- Si no tiene edad suficiente (18), indica que no puede conducir.

Valida si puede conducir:
- Si tiene más de 18 años y licencia: "Puedes conducir."
  De lo contrario: "No puedes conducir."

  Tienes un momento para intentarlo…
 
*/

let edad = parseInt(prompt("Ingresa tu edad"));
let conLicencia = prompt("Tienes licencia? (Si/No)").toUpperCase();

if (edad > 18 && conLicencia === "SI") {
  console.log("Puedes conducir");
} else {
  console.log("No puedes conducir");
}
