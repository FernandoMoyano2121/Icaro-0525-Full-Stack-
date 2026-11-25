/*
 const persona = {
  nombre: "Mariana",
  nacionalidad: "Argentina",

  comunicar: function () {
    console.log(`hola soy ${this.nombre}`);
  },
};

console.log(persona.nacionalidad);
 */

/* const persona1 = {
  nombre: "Alvaro",
  nacionalidad: "Argentina",
};
*/

/* ****************** FUNCIÓN CONSTRUCTORA **********************/

function PersonaConstructora(nombre, nacionalidad) {
  this.nombre = nombre;
  this.nacionalidad = nacionalidad;
}

/* ********************** CLASE PERSONA ***********************/

class Persona {
  constructor(nombre, nacionalidad) {
    this.nombre = nombre;
    this.nacionalidad = nacionalidad;
  }
}

const persona1 = new Persona("Mariana", "Argentina");
const persona2 = new Persona("David", "Argentina");

/* ********************* CLASE AUTO ************************/

class Auto {
  constructor(marca, modelo, año) {
    this.marca = marca;
    this.modelo = modelo;
    this.año = año;
  }
}

const auto1 = new Auto("Toyota", "Yaris", 2020);
const auto2 = new Auto("Toyota", "Corolla", 2021);
const auto3 = new Auto("Honda", "Civic", 2019);

const autos = [];
autos.push(auto1, auto2, auto3);
console.log(autos);

/* ************************* CLASE ANIMAL ********************/

class Animal {
  constructor(nombre, tipo) {
    this.nombre = nombre;
    this.tipo = tipo;
  }

  describir() {
    console.log(`Soy un ${this.tipo} y me llamo ${this.nombre}`);
  }

  comunicar() {
    console.log(`soy un ${this.tipo} y hago un sonido`);
  }
}

class Perro extends Animal {
  comunicar() {
    console.log(`Soy ${this.nombre} y ladro`);
  }
}

const miPerro = new Perro("Rex", "Perro");
miPerro.comunicar();

/*
const perro = new Animal("Bobi", "Perro");
perro.describir();
*/

/* *********************** METODO SUPER *********************/

class PersonaConSaludo {
  constructor(nombre, nacionalidad) {
    this.nombre = nombre;
    this.nacionalidad = nacionalidad;
  }

  saludar() {
    console.log(`Hola mi nombre es ${this.nombre}`);
  }
}

class Estudiante extends PersonaConSaludo {
  constructor(nombre, nacionalidad, curso) {
    super(nombre, nacionalidad);

    this.curso = curso;
  }

  mostrarCurso() {
    console.log(`Estoy en el curso de ${this.curso}`);
  }
}

const estudiante1 = new Estudiante("Carlos", "Argentina", "Full-Stack");

/* ******************** GETTER Y SETTERS *******************/

class PersonaConGetters {
  constructor(nombre, nacionalidad) {
    this._nombre = nombre;
    this._nacionalidad = nacionalidad;
  }

  get nombre() {
    return this._nombre;
  }

  set nombre(nuevoNombre) {
    this._nombre = nuevoNombre;
  }
}

const persona = new PersonaConGetters("Carlos", "Argentina");

persona._nombre = "Julian"; //mala practica
persona.nombre = "Julian";
console.log(persona.nombre);

/* ********************** ATRIBUTOS PRIVADOS ****************/

/*
  "_" vs "#"
  - this._nombre -> el guion bajo es solo una CONVENCIÓN que avisa
    "esto es interno, no lo toques". No protege nada: desde afuera
    se puede leer y modificar igual (por eso arriba es mala práctica).
  - this.#saldo  -> privado de verdad. JavaScript no deja usarlo
    fuera de la clase.

  ¿Y "protected"?
  - En otros lenguajes (Java, C#, TypeScript) existe "protected":
    privado para afuera, pero accesible desde las clases hijas.
  - JavaScript NO tiene protected. Ojo: una clase hija tampoco puede
    usar los # de la clase padre. Si Animal tuviera #nombre, dentro
    de Perro no podríamos escribir this.#nombre: habría que usar
    el getter de Animal.
*/

/* ****************** LOS 4 PILARES DE LA POO *******************

  1. ENCAPSULAMIENTO -> proteger los datos de un objeto y controlar
     cómo se accede a ellos.
     En la clase: propiedades privadas (#) + getters y setters
     (CuentaBancaria, Tarea).

  2. ABSTRACCIÓN -> usar un objeto sin conocer cómo funciona por
     dentro. Solo importa QUÉ hace, no CÓMO lo hace.
     En la clase: miListado.agregarTareas(tarea1) agrega la tarea
     sin que sepamos cómo la guarda.

  3. HERENCIA -> una clase hija reutiliza lo que tiene la clase padre.
     En la clase: Perro extends Animal, Estudiante extends
     PersonaConSaludo (con super para reutilizar el constructor).

  4. POLIMORFISMO -> un mismo método se comporta distinto según la
     clase del objeto.
     En la clase: Animal y Perro tienen comunicar(), pero Perro lo
     redefine y "ladra" en vez de "hacer un sonido".

****************************************************************/

class CuentaBancaria {
  #saldo;
  constructor(saldoInicial) {
    this.#saldo = saldoInicial;
  }

  get saldo() {
    return this.#saldo;
  }

  set saldo(nuevoSaldo) {
    this.#saldo = nuevoSaldo;
    console.log(`Nuevo saldo = ${this.#saldo}`);
  }
}

const miCuentaBancaria = new CuentaBancaria(10000);
//No se puede acceder a la propiedad "#saldo" fuera de la clase
//"CuentaBancaria" porque tiene un identificador privado.
//miCuentaBancaria.#saldo;
console.log(miCuentaBancaria.saldo);
miCuentaBancaria.saldo = 15000;
console.log(miCuentaBancaria.saldo);

console.log("Hola");

/******************* APLICACIÓN DE TAREAS  ***************/

//UpperCamelCase
class Tarea {
  #titulo;
  #completada;

  constructor(titulo, completada = false) {
    this.#titulo = titulo;
    this.#completada = completada;
  }

  //lowerCamelCase
  get titulo() {
    return this.#titulo;
  }

  set titulo(nuevoTitulo) {
    this.#titulo = nuevoTitulo;
  }

  /*   set completada(){} */
}

class ListaTareas {
  #listado;

  constructor() {
    this.#listado = [];
  }

  agregarTareas(cualquierNombre) {
    this.#listado.push(cualquierNombre);
  }
}

const tarea1 = new Tarea("Lavar la ropa");
const tarea2 = new Tarea("Estudiar JavaScript");

const miListado = new ListaTareas();
miListado.agregarTareas(tarea1);
miListado.agregarTareas(tarea2);

//FECHA ACTUAL
const fechaActual = new Date();
