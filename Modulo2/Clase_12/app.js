/*
for(inicialización, condición, actualización){

...código a ejecutar

}
*/

/*********************************************************************
Este for es adecuado cuando sabemos de antemano cuántas repeticiones queremos:
en este caso, mostrar los números del 0 al 9.
***********************************************************************/

/*
 for (let i = 0; i < 10; i++) {
  console.log(i);
}
*/

/* ********************* TABLA DE MULTIPLICAR ******************/

/***************************************************************************
  Un for resulta natural para una tabla del 1 al 10 porque el rango de
  repeticiones está definido antes de empezar.
***************************************************************************/

let entrada = prompt("Por favor ingresa un número");
let numeroIngresado = Number(entrada);

 if (
  entrada === null ||
  entrada.trim() === "" ||
  !Number.isFinite(numeroIngresado)
) {
  alert("Ingresa un número válido");
} else {
  for (let i = 1; i <= 10; i++) {
    let tabla = i * numeroIngresado;
    console.log(
      `El numero ${numeroIngresado} multiplicado por ${i} es : ${tabla}`,
    );
  }
}

/* ************************************ WHILE *****************************/

/* while (condition) {...} */

/*************************************************************************
    Un while se usa cuando la repetición depende de que una condición siga siendo
    verdadera. Este ejemplo muestra los números mientras j sea menor o igual que 5;
    como el límite sí se conoce, también podría escribirse con un for.
****************************************************************************/

let j = 0;
while (j <= 5) {
  console.log(j);
  j++;
}

/***********************************  BREAK ****************************/

/********************************************************************
Un while sirve cuando queremos continuar hasta que ocurra una condición de
salida. Aquí el bucle termina antes de lo previsto cuando i llega a 3.
********************************************************************/

let i = 0;
while (i <= 5) {
  if (i === 3) {
    console.log("A mitad del bucle");
    break;
  }
  console.log(i);
  i++;
}

/**********************************  CONTINUE ***************************/

/************************************************************************* 
Un for es práctico cuando recorremos un rango conocido (del 0 al 10) y queremos
omitir un valor concreto, en este caso el 5.
*************************************************************************/

for (let i = 0; i <= 10; i++) {
  if (i === 5) {
    continue;
  }
  console.log(i);
}

/****************************  TABLA DE MULTIPLICAR WHILE ***********/

/*************************************************************************
Este while repite la operación mientras i no supere 10. La cantidad de vueltas
está definida en este ejemplo; se muestra con while para practicarlo, aunque un
for también sería una opción natural para recorrer ese rango fijo.
***************************************************************************/

/* {
  let entrada = prompt("Por favor ingresa un número");
  let numeroIngresado = Number(entrada);

  if (
    entrada === null ||
    entrada.trim() === "" ||
    !Number.isFinite(numeroIngresado)
  ) {
    alert("Ingresa un número válido");
  } else {
    let i = 1;
    while (i <= 10) {
      let tabla = i * numeroIngresado;
      console.log(`${numeroIngresado} * ${i} = ${tabla}`);
      i++;
    }
  }
} */

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

/*
Un for es adecuado porque el máximo de intentos está definido de antemano:
el usuario puede probar hasta tres veces. El break permite terminar antes si
adivina el número.
*/
for (
  let intentoUsuario = 1;
  intentoUsuario <= intentosTotales;
  intentoUsuario++
) {
  let eleccionUsuario = parseInt(
    prompt("Ingrese un numero para intentar adivinar el secreto"),
  );

  /*
  Se usan if separados para evaluar cada situación de forma independiente y
  mantener el flujo lineal: si acierta, break termina el bucle; si falla,
  además de avisarle, se comprueba si agotó los intentos. Así se evita anidar
  condiciones dentro de un else. También podría usarse if/else para distinguir
  acierto y error, pero no es necesario porque el break ya corta el caso de
  acierto.
  */

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
