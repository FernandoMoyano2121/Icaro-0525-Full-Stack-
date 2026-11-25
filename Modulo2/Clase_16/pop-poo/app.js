/* 
En la Programación Orientada a Objetos (POO) Tradicional (como en Java o C#),
primero diseñas un molde abstracto (la Clase). Este molde no es un juguete real,
no se puede tocar ni usar; es solo un plano. Para tener un juguete, fabricas uno
usando ese molde (instancias un Objeto). Si luego quieres que un juguete haga algo nuevo, 
generalmente debes modificar el molde original o crear un molde nuevo.

En la Programación Basada en Prototipos (como en JavaScript), no existen los moldes.
Solo existen objetos reales y vivos. Para crear algo nuevo, tomas un objeto que ya tienes en la mano
(tu Prototipo) y dices: "Quiero crear un objeto nuevo que esté vinculado a este". 
Si más adelante le enseñas un truco nuevo al objeto original, el nuevo objeto
también sabrá hacerlo porque están secretamente conectados por un "hilo invisible".

*/

/* *************** Ejemplo 1: El enfoque Tradicional (El "Molde") *****************/

// 1. Construimos el plano o "molde"
class Perro {
  constructor(nombre) {
    this.nombre = nombre;
  }

  ladrar() {
    console.log("¡Guau! Me llamo " + this.nombre);
  }
}

// 2. Usamos el molde para crear un objeto real
const miPerro = new Perro("Firulais");
miPerro.ladrar(); // "¡Guau! Me llamo Firulais"

/* *************** Ejemplo 2: El enfoque de Prototipos (El "Objeto Vivo") **************/

// 1. Tenemos un objeto completamente funcional (El Prototipo)
const animalPrototipo = {
  hacerSonido: function () {
    console.log("Hola, soy " + this.nombre);
  },
};

// 2. Creamos un nuevo objeto vinculándolo al prototipo anterior
const miGato = Object.create(animalPrototipo);
miGato.nombre = "Garfield";

// miGato no tiene la función hacerSonido adentro suyo.
// Como no la encuentra, viaja por el hilo invisible hacia su prototipo y la usa.
miGato.hacerSonido(); // "Hola, soy Garfield"

// 3. La magia dinámica: Si le enseñamos algo al prototipo...
animalPrototipo.dormir = function () {
  console.log("Zzzzz...");
};

// ...miGato aprende a hacerlo instantáneamente, aunque ya estaba creado.
miGato.dormir(); // "Zzzzz..."

/* En resumen: la POO tradicional funciona fotocopiando planos para construir
 cosas nuevas, mientras que JavaScript funciona clonando objetos reales 
 que se prestan herramientas entre sí. */

/* 
 Cada vez que creas un arreglo en JavaScript, no estás creando un objeto vacío;
estás creando un objeto que nace conectado por ese "hilo invisible" a un
prototipo gigante llamado Array.prototype.

Ese prototipo base es el dueño de todas las herramientas (métodos) que ya conoces.

El caso de los Arreglos (Array.prototype)
Cuando escribes esto:
 */
const misNumeros = [1, 2, 3];

misNumeros.push(4);

/* 
El objeto misNumeros realmente solo contiene los datos [1, 2, 3].
No tiene la función push adentro suyo. Cuando intentas usar .push(4),
JavaScript dice: "Este objeto no sabe hacer esto, voy a viajar por el hilo hacia su prototipo".

Llega a Array.prototype, encuentra la función push,
y la ejecuta. Gracias a que existe ese único prototipo central,
millones de arreglos en tu programa no necesitan tener una copia de la función
push, map, o filter ocupando memoria; todos se la piden prestada al mismo prototipo original.
*/

/* **************EL GRAN SECRETO! NO SON ARREGLOS REALES ****************/

/* 
En lenguajes de programación tradicionales (C, Java), un arreglo
es una estructura de datos rígida y un bloque continuo en la memoria
de la computadora. En JavaScript, los arreglos son simplemente Objetos disfrazados.

Puedes comprobar esto pidiéndole a JavaScript que te diga qué tipo de dato es:
*/

const frutas = ["manzana", "pera"];
console.log(typeof frutas); // Imprime: "object" (¡No dice "array"!)

/*
Para JavaScript, las posiciones (0, 1, 2) no son más que los nombres de las propiedades 
(las keys o claves) de un objeto, con un comportamiento especial que actualiza 
automáticamente una propiedad llamada length.
*/

// Como lo escribes tú:
const frutas = ["manzana", "pera"];

// Como lo entiende JavaScript en el fondo (aproximadamente):
const frutasEnSecreto = {
  0: "manzana",
  1: "pera",
  length: 2,
};
