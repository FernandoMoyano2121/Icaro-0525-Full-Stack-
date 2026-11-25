/*--------------- ESTRUCTURA DE UNA FUNCION  ------------

function nombreDeLaFuncion(parametro1, parametro2){
  ...codigo a ejecutar
}
nombreDeLaFuncion()
*/

let saludo = "Hola Cómo estás?";
console.log(saludo); //Hola Cómo estás?

/* Reasignacion del valor */

saludo = "Hola Alumnos!";
console.log(saludo);

/* ----------------RESOLVIENDO CON FUNCION--------------------- */

/*
 function saludar() {
  console.log("Hola Alumnos!");
}
*/

/* ***************FUNCIONES CON PARAMETROS *******************/

/**
 * @description funcion que emite un saludo
 * @param {string} saludo
 */

function saludar(saludo) {
  console.log(saludo);
}

saludar(5);
saludar("Hola Chicos! ");

/* ************************ SCOPE ***************************/

function saludar() {
  let nombre = "Mariana";
  console.log("Hola " + nombre);
}

console.log(nombre);

saludar();

/* ******************* EJERCICIO SCOPE *********************/

/* let nombre = "John";

function saludar() {
  let nombre = "Juan";
  console.log(nombre);
}

console.log(nombre);
saludar();
 */

/* *************FUNCIONES E IMPRESION EN CONSOLA **********/

/*
 function sumar(a, b) {
  console.log(a + b);
}
*/

/* ************** FUNCION CON VALOR DE RETORNO **************/

/*
 function sumar(a, b) {
  return a + b;
}
*/

/* ************* EJEMPLO SENCILLO DE RETURN **********/

/*
  En JavaScript, return finaliza la ejecucion de una funcion y devuelve
  un valor al lugar desde donde fue llamada. 
  
  Ese valor se puede guardar en una variable o utilizar en otra expresion. 
  return no muestra el valor en la consola; para verlo, hay que usar console.log. 
  Si una funcion termina sin ejecutar return, devuelve undefined.
*/

function ejemploReturn() {
  return "Hola";
}

let mensajeRetornado = ejemploReturn();
console.log(mensajeRetornado); // return entrega "Hola" a quien llamó la función

/* ************* FUNCION QUE RETORNA UNA VARIABLE **********/

function sumar(a, b) {
  let resultado = a + b;
  return resultado;
}

sumar(3, 6);

let resultado = sumar(3, 6);
console.log(resultado);

sumar(3, 6);

/* ***************** FUNCION ANONIMA *****************/

const sumar = function (a, b) {
  return a + b;
};

console.log(sumar(9, 8));

/* ************ FUNCIONES FLECHA 1 *********************/

const sumar = (a, b) => {
  return a + b;
};

/* ****************** FUNCIONES FLECHA 1 SINTAXIS CORTA**************/

const sumar = (a, b) => a + b;
console.log(sumar(9, 10));

/* *************** COMPORTAMIENTOS DE LAS FUNCIONES FLECHA / DECLARADA *********/

/* saludar();

const saludar = () => {
  console.log("Hola! ");
};
 */

/* function saludar() {
  console.log("Hola!");
}
 */

/* ********FUNCIONES PASADAS COMO PARAMETROS **********/

function operacion(a, b, calculo) {
  return calculo(a, b);
}

const multiplicar = (x, y) => x * y;

console.log(operacion(5, 3, multiplicar));

/* ************************ APLICACION DE TAREAS ****************/

let tareas = "";
let numeroTarea = 0;

function mostrarMenuDeOpciones() {
  return prompt(
    "Ingresa una opcion para continuar:\n 1. Ingresar una nueva tarea\n 2. Ver mis tareas\n 3. Salir\n",
  );
}

function agregarTarea() {
  let nuevaTarea = prompt("Ingresa la tarea");

  if (nuevaTarea && nuevaTarea.trim() !== "" && isNaN(nuevaTarea)) {
    numeroTarea++;
    tareas += `${numeroTarea}. ${nuevaTarea.trim()}\n`;
    alert("✅Tarea agregada con exito! ");
  } else {
    alert("🔴El formato de la tarea no es valido");
  }
}

function mostrarTareas() {
  if (numeroTarea === 0) {
    alert("No hay tareas pendientes");
  } else {
    alert(`LISTADO DE TAREAS : \n${tareas}`);
  }
}

function main() {
  let eleccionUsuario = mostrarMenuDeOpciones();

  while (eleccionUsuario !== "3") {
    switch (eleccionUsuario) {
      case "1":
        agregarTarea();
        break;
      case "2":
        mostrarTareas();
        break;
      default:
        alert("Por favor, Ingresa una opcion valida");
        break;
    }

    eleccionUsuario = mostrarMenuDeOpciones();
  }
  alert("Nos vemos luego!!");
}

main();
