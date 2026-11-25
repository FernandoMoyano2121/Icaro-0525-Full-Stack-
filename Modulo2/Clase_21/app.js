/*
 * ASINCRONÍA:
 * Permite ejecutar operaciones sin bloquear el resto del
 * código mientras espera respuestas que tardan en completarse,
 * como temporizadores o solicitudes a APIs.
 *
 * PROMESA:
 * Es un objeto que representa el resultado eventual
 * de una operación asincrónica.
 * Puede resolverse con éxito o rechazarse si ocurre un error.
 */

/* **********************CALLBACK *************************/

/**
 *
 * @param {string} nombre
 * @param {function} callback
 */
function saludar(nombre, callback) {
  console.log(`Hola ${nombre}`);
  callback();
}

function despedir() {
  console.log("Adios! ");
}

saludar("Bruno", despedir);

/* **********************SETTIMEOUT() **************************/

// setTimeout no bloquea el resto del código: programa una
// tarea para ejecutarla después del tiempo indicado y
// permite continuar con las siguientes instrucciones.
console.log("Inicio");

setTimeout(() => {
  console.log("Han pasado 3 segundos");
}, 3000);

console.log("Fin");

/* **********************OBJETO PROMISE **********************/

/* construcción */
const promesa = new Promise((resolve, reject) => {
  const exito = true;

  if (exito) {
    resolve("Promesa resuelta");
  } else {
    reject("Promesa rechazada");
  }
});

/* resolución */
promesa
  .then((resultado) => console.log(resultado))
  .catch((error) => console.log(error));

/* ------------------------PROMISE ALL------------------------------- */

// Promise.all: ejecuta varias promesas a la vez y espera a que todas terminen.
// El resultado es un array con los valores en el mismo orden de las promesas.
const tareaRapida = new Promise((resolve) => {
  setTimeout(() => resolve("Primera tarea completada"), 1000);
});

const tareaLenta = new Promise((resolve) => {
  setTimeout(() => resolve("Segunda tarea completada"), 3000);
});

Promise.all([tareaRapida, tareaLenta])
  .then((resultados) => {
    console.log("Promise.all:", resultados);
  })
  .catch((error) => {
    console.log("Una promesa fue rechazada:", error);
  });

/* --------------------------PROMISE RACE------------------------------- */

// Promise.race: obtiene el resultado de la primera promesa que termine,
// sin esperar a las demás.
const promesaUno = new Promise((resolve) => {
  setTimeout(() => resolve("Ganó la promesa 1"), 1000);
});

const promesaDos = new Promise((resolve) => {
  setTimeout(() => resolve("Ganó la promesa 2"), 3000);
});

Promise.race([promesaUno, promesaDos])
  .then((resultado) => {
    console.log("Promise.race:", resultado);
  })
  .catch((error) => {
    console.log("La primera promesa fue rechazada:", error);
  });

/* ------------------------------------------------------- */

async function obtenerDatos() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Datos obtenidos");
    }, 3000);
  });
}

async function ejecutar() {
  const datos = await obtenerDatos();
  console.log(datos);
}

ejecutar();

/* ****************** api pokemon ***********************/

document.getElementById("buscarBtn").addEventListener("click", buscarPokemon);

async function obtenerPokemons(nombre) {
  const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);

  if (!respuesta.ok) {
    throw new Error("Pkemon no encontrado");
  }

  const data = await respuesta.json();
  return data;
}

async function buscarPokemon() {
  const nombre = document.getElementById("nombrePokemon").value;
  const resultado = document.getElementById("resultado");

  resultado.textContent = "Buscando...";

  try {
    const pokemon = await obtenerPokemons(nombre);

    /* opcion creando tarjeta con createElement() */
    const imagen = document.createElement("img");
    imagen.setAttribute("src", `${pokemon.sprites.back_default}`);

    /* h2 */
    const h2 = document.createElement("h2");
    h2.textContent = `${pokemon.name}`;

    /* h3 */
    const p = document.createElement("p");
    p.textContent = `${pokemon.weight}`;

    // limpiar "Buscando..."
    resultado.textContent = "";
    resultado.append(imagen, h2, p);

    /*
    resultado.innerHTML = `
    <img src="${pokemon.sprites.back_default}"></img>
    <h2>Nombre: ${pokemon.name} </h2>
    <p>Peso: ${pokemon.weight}</p>
    `;
    */
  } catch (error) {
    console.log(error);
  }
}
