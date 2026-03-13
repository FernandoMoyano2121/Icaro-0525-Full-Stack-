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

setTimeout(() => {
  console.log("Hola");
}, 3000);

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

/* -------------------------------------- */

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
