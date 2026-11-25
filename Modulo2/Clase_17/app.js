/* *********************** LET CONST ************************/

let nombreDeLaPersona = "Fernando";
nombreDeLaPersona = "Bruno";

let nombre1;
/* const nombre2; */

/* -------------------------------------------------------- */

function saludar() {
  const nombre = "Fernando";
}

// "nombre" solo existe dentro de las llaves de saludar() (scope de bloque).
// Si descomentás la línea de abajo da ReferenceError y corta el resto del archivo.
/* console.log(nombre); */

/* ******************** ARROW FUNCTIONS **********************/

const sumar = (a, b) => a + b;
console.log(sumar(2, 3)); // 5

/* *************** DESESTRUCTURACIÓN DE OBJETOS **************/

const persona1 = {
  nombre: "Ana",
  edad: 35,
};

console.log(persona1.nombre);
const nombrePersona1 = persona1.nombre;
console.log(nombrePersona1);

const { nombre } = persona1;
console.log(nombre);

const { nombre: nombrePersona } = persona1;
console.log(nombrePersona);

/* ****************DESESTRUCTURACIÓN DE ARRAYS ***************/

const numeros = [1, 2, 3, 4, 5, 6];
console.log(numeros[1]);

const [numero1] = numeros;
console.log(numero1);

/* ************** DESESTRUCTURACIÓN POR OMISIÓN **************/

const [primero, , tercero] = numeros;
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

let nombreAlumno = "Federico";
console.log("Hola mi nombre es " + nombreAlumno);
console.log(`Hola mi nombre es ${nombreAlumno}`);

/* ******************** ENCAPSULAMIENTO **********************/

class CuentaBancaria {
  constructor(saldoInicial) {
    let saldo = saldoInicial; // Propiedad privada (con closure)

    this.mostrarSaldo = () => {
      console.log(`Saldo: ${saldo}`);
    };

    this.depositar = (monto) => {
      saldo += monto;
      console.log(`Nuevo saldo: ${saldo}`);
    };
  }
}

const cuenta = new CuentaBancaria(1000);
cuenta.mostrarSaldo(); // "Saldo: 1000"
cuenta.depositar(500); // "Nuevo saldo: 1500"

/* ************************ HERENCIA *************************/

class Animal {
  constructor(nombre) {
    this.nombre = nombre;
  }
  hablar() {
    console.log(`${this.nombre} hace un sonido.`);
  }
}

class Perro extends Animal {
  hablar() {
    console.log(`${this.nombre} ladra.`);
  }
}

const miPerro = new Perro("Rex");
miPerro.hablar(); // "Rex ladra."

/* ********************* POLIMORFISMO ************************/

class Figura {
  calcularArea() {
    console.log("Calculo de area");
  }
}

class Rectangulo extends Figura {
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

/* const rectangulo = new Rectangulo(100, 200);
console.log(rectangulo.calcularArea());

const circulo = new Circulo(300);
console.log(circulo.calcularArea()); */

/* Polimorfismo */
const figuras = [new Rectangulo(100, 200), new Circulo(300)];
figuras.forEach((figura) => console.log(figura.calcularArea()));

/* ************************* MÓDULOS *************************/
// import/export solo funcionan si el script se carga como módulo:
// <script type="module" src="./main.js"></script>
// Por eso los ejemplos quedan comentados acá.
// OJO: con type="module" el index.html no funciona abriéndolo con
// doble clic (file://). Hay que usar un servidor, por ejemplo la
// extensión Live Server de VS Code.

/* ---------------- 1) EXPORTACIÓN NOMBRADA ----------------
   Un archivo puede tener TODAS las que quiera.

// archivo.js
export const sumar = (a, b) => a + b;
export const restar = (a, b) => a - b;

// IMPORTADO EN OTRO ARCHIVO
// main.js -> CON llaves y con el MISMO nombre
import { sumar, restar } from "./archivo.js";

console.log(sumar(2, 3)); // 5
console.log(restar(5, 2)); // 3

// Si necesitamos otro nombre, se renombra con "as":
import { sumar as suma } from "./archivo.js";
console.log(suma(2, 3)); // 5
*/

/* ---------------- 2) EXPORTACIÓN POR DEFAULT ----------------
   Solo puede haber UNA por archivo.

// calculadora.js
const multiplicar = (a, b) => a * b;
export default multiplicar;

// IMPORTADO EN OTRO ARCHIVO
// main.js -> SIN llaves y con el nombre que quieras
import multiplicar from "./calculadora.js";
import por from "./calculadora.js"; // también funciona

console.log(multiplicar(2, 3)); // 6
console.log(por(2, 3)); // 6
*/

/* ---------------- 3) LAS DOS JUNTAS ----------------
   Muy común en React: una default + varias nombradas.

// calculadora.js
export default (a, b) => a * b;
export const PI = 3.14;

// main.js -> primero la default, después las nombradas entre llaves
import multiplicar, { PI } from "./calculadora.js";
*/

/*
  +--------------------------+--------------------+--------------+
  |                          | Nombrada           | Por default  |
  +--------------------------+--------------------+--------------+
  | ¿Cuántas por archivo?    | Todas las que      | Una sola     |
  |                          | quieras            |              |
  +--------------------------+--------------------+--------------+
  | ¿Llaves en el import?    | Sí  { }            | No           |
  +--------------------------+--------------------+--------------+
  | ¿Nombre al importar?     | El mismo (o "as")  | Cualquiera   |
  +--------------------------+--------------------+--------------+

  ¿Cuál conviene?
  - NOMBRADA: cuando el archivo exporta varias cosas (funciones,
    constantes, clases). Obliga a usar el nombre real y el editor
    autocompleta los imports.
  - DEFAULT: cuando el archivo exporta UNA cosa principal, como
    pasa con los componentes de React.
*/
