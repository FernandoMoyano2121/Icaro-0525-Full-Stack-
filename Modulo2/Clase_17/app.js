/* ***************** LET CONST *******************/

/* let nombre = "Fernando";
nombre = "Bruno"; */

/* 
let nombre1;
const nombre2;
*/

/* function saludar() {
  const nombre = "Fernando";
}

console.log(nombre); */

/* const persona = {
  nombre: "Ana",
  edad: 35,
}; */

/* *************** DESESTRUCTURACIÓN DE OBJETOS ***************/

/* console.log(persona.nombre);
const nombrePersona = persona.nombre;
console.log(nombrePersona); */

const { nombre: nombrePersona } = persona;
//const { nombre } = persona;
console.log(nombrePersona);

/* ****************DESESTRUCTURACIÓN DE ARRAYS ***************/

const numeros = [1, 2, 3, 4, 5, 6];
console.log(numeros[1]);

/* ************** DESESTRUCTURACIÓN POR OMISIÓN **************/

const [primero, tercero] = numeros;
console.log(numeros[0]);
console.log(primero);
console.log(tercero);

/* ************** OPERADOR SPREAD ARRAYS**************/

const lista1 = [1, 2, 3];
const lista2 = [4, 5, 6];

const listaCombinada = [...lista1, ...lista2];
/* const listaCombinada = [...lista1, 4, 5, 6] */
console.log(listaCombinada);

/* ************** OPERADOR SPREAD OBJETOS **************/

const persona = { nombre: "Federico", edad: 30 };
const personaActualizada = { ...persona, nacionalidad: "Argentina" };
console.log(personaActualizada);

/* ************** TEMPLATE STRING/PLANTILLAS LITERALES **************/

let nombre = "Federico";
console.log("Hola mi nombre es " + nombre);
console.log(`Hola mi nombre es ${nombre}`);

/* ********************* POLIMORFISMO ************************/

class Figura {
  calcularArea() {
    console.log("Calculo de area");
  }
}

class Reactangulo extends Figura {
  constructor(base, altura) {
    super();
    this.base = base;
    this.altura = altura;
  }

  calcularArea() {
    return this.base * this.altura;
  }
}

class Circulo extends Figura {
  constructor(radio) {
    super();
    this.radio = radio;
  }

  calcularArea() {
    return Math.round(Math.PI * this.radio ** 2);
  }
}

/* const rectangulo = new Reactangulo(100, 200);
console.log(rectangulo.calcularArea());

const circulo = new Circulo(300);
console.log(circulo.calcularArea()); */

/* Polimorfismo */
const figuras = [new Reactangulo(100, 200), new Circulo(300)];
figuras.forEach((figura) => console.log(figura.calcularArea()));
