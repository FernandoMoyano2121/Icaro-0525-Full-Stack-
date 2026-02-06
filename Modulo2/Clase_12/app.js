/*
for(inicialización, condición, actualización){

...código a ejecutar

}
*/

/* for (let i = 0; i < 10; i++) {
  console.log(i);
}
 */
/* ********************* TABLA DE MULTIPLICAR ******************/

/*  let numeroIngresado = parseInt(prompt("Por favor ingresa un número"));

for (let i = 1; i <= 10; i++) {
  let tabla = i * numeroIngresado;
  console.log(
    `El numero ${numeroIngresado} multiplicado por ${i} es : ${tabla}`
    "El numero" + numeroIngresado + "multiplicado por" + i + "es : " + tabla,
  );
} */

/* ******************** WHILE *****************************/

/* while (condition) {...} */

let j = 0;
while (j <= 5) {
  console.log(j);
  j++;
}

/********************  BREAK ****************************/

let i = 0;
while (i <= 5) {
  if (i === 3) {
    console.log("A mitad del bucle");
    break;
  }
  console.log(i);
  i++;
}

/********************  CONTINUE ***************************/

for (let i = 0; i <= 10; i++) {
  if (i === 5) {
    continue;
  }
  console.log(i);
}

/***************  TABLA DE MULTIPLICAR WHILE ***********/

let numeroIngresado = parseInt(prompt("Por favor ingresa un número"));

if (isNaN(numeroIngresado)) {
  alert("Ingresa un valor valido");
} else {
  let i = 1;
  while (i <= 10) {
    let tabla = i * numeroIngresado;
    console.log(`${numeroIngresado} * ${i} = ${tabla}`);
    i++;
  }
}

/* Intentar adivinar el numero secreto */

/* 

ENTRADA
"Ingrese un numero para intentar adivinar el secreto"

PROCESO
- if()
- for()
- variable = numero ingresado por el usuario
- variable = numero secreto
- variable = intentos del usuario

SALIDA
alert()
console.log()

*/

let numeroSecreto = 7;
let intentosTotales = 3;

for (
  let intentoUsuario = 1;
  intentoUsuario <= intentosTotales;
  intentoUsuario++
) {
  let eleccionUsuario = parseInt(
    prompt("Ingrese un numero para intentar adivinar el secreto"),
  );

  /* El usuario adivina el numero */
  if (eleccionUsuario === numeroSecreto) {
    alert("Adivinaste!!! ");
    break;
  }

  /* Si el usuario no acierta */
  if (eleccionUsuario !== numeroSecreto) {
    alert("No adivinaste, continua intentando");
  }

  /* Si Se llega al ultimo intento y no adivina */
  if (intentoUsuario === intentosTotales) {
    alert(
      `No lograste adivinar el numero, el numero secreto era ${numeroSecreto}`,
    );
    break;
  }

  alert(`Llevas ${intentoUsuario} intento(s)`);
}
