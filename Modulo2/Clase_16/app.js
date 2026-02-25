/* const persona = {
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
}; */

/* ****************** FUNCIÓN CONSTRUCTORA **********************/

function Persona(nombre, nacionalidad) {
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

/* *********************** CLASE AUTO ************************/

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
    console.log(`Soy un ${this.nombre} y ladro`);
  }
}

const miPerro = new Perro("Rex", "Perro");
miPerro.comunicar();

/* const perro = new Animal("Bobi", "Perro");
perro.describir(); */

/* *********************** METODO SUPER *********************/

class Persona {
  constructor(nombre, nacionalidad) {
    this.nombre = nombre;
    this.nacionalidad = nacionalidad;
  }

  saludar() {
    console.log(`Hola mi nombre es ${this.nombre}`);
  }
}

class Estudiante extends Persona {
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

class Persona {
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

const persona = new Persona("Carlos", "Argentina");

persona._nombre = "Julian"; //mala practica
persona.nombre("Julian");
persona.nombre();

/* ********************** ATRIBUTOS PRIVADOR ****************/

class CuentaBancaria {
  #saldo;
  constructor(saldoInicial) {
    this.#saldo = saldoInicial;
  }

  set saldo(nuevoSaldo) {
    this.#saldo = nuevoSaldo;
    console.log(`Nuevo salido = ${this.#saldo}`);
  }
}

const miCuentaBancaria = new CuentaBancaria(10000);
//No se puede acceder a la propiedad "#saldo" fuera de la clase
// "CuentaBancaria" porque tiene un identificador privado.
//miCuentaBancaria.#saldo;
miCuentaBancaria.saldo(15000);

console.log("Hola");

/******************* APLICAION DE TAREAS  ***************/

//UperCamelCase
class Tarea {
  #titulo;
  #completada;

  constructor(titulo, completada = false) {
    ((this.#titulo = titulo), (this.#completada = completada));
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
