//-------------------------------------------------------------
//                  OBJETOS LITERALES
//-------------------------------------------------------------

const persona = {
  nombre: "Mariana",
  edad: 30,
  profesion: "Administrativa",

  saludar: function () {
    console.log(`Hola mi nombre es ${this.nombre}`);
    console.log(this);
  },

  /*   saludar: () => {
    console.log(`Hola mi nombre es ${this.nombre}`);
    console.log(this);
  }, */
};

//accediendo a los valores de las claves
console.log(persona.nombre);
console.log(persona.edad);
console.log(persona["profesion"]);

//asignando un nuevo valor
persona.nombre = "Fernando";
persona.saludar();

//accediendo solo a las claves
console.log(Object.keys(persona));
//accediendo solo a los valores
console.log(Object.values(persona));

/* FOR OF */
const nombres = ["Fernando", "Mariana", "Alvaro"];

for (let nombre of nombres) {
  console.log(nombre);
}

/* FOR IN */
for (let clave in persona) {
  console.log(`${clave} : ${persona[clave]}`);
}

console.log(Object.entries(persona));

/* ********************************************************
Crear un objeto mascota con las siguientes propiedades:
nombre
edad
energía

Y los siguientes métodos:
Cumplir Años: Debe aumentar en 1 la edad
Descansar: Debe aumentar la energía en 1 por cada hora que duerme
Comer: Debe aumentar la energía en 1 por cada 200g de comida
Pasear: Debe bajar la energía en 1 por cada hora que pasea
Adoptar: Debe asignarle un nombre nuevo a la mascota
**************************************************************/

const mascota = {
  nombre: "",
  edad: 1,
  energia: 2,
  medicamentos: ["abc", "sdf", "dfs"],

  /**
   * Description función que aumentar la energía
   * en 1 por cada hora que duerme
   * @param {number} horas
   */
  descansar: function (horas) {
    this.energia += horas;
  },

  /**
   * Description: función que aumenta
   * la energía en 1 por cada 200g de comida
   * @param {number} gramos
   */
  comer: function (gramos) {
    this.energia += gramos / 200;
  },

  /**
   * Description: funcion que baja la energía
   * en 1 por cada hora que pasea
   * @param {number} horasDePaseo
   */
  pasear: function (horasDePaseo) {
    this.energia -= horasDePaseo;
  },

  /**
   * Description función que asigna un
   * nombre nuevo a la mascota
   * @param {string} nuevoNombre
   */
  adoptar: function (nuevoNombre) {
    this.nombre = nuevoNombre;
  },

  recetarMedicacion: function (nombreDeMedicacion) {
    this.medicamentos.push(nombreDeMedicacion);
  },

  verMedicamentos: function () {
    mascota.medicamentos.forEach((medicamento) => console.log(medicamento));
  },
};

//1
mascota.adoptar("Messi");
console.log(mascota.nombre);

//2
mascota.comer(800);
console.log(mascota.energia);

//3
mascota.descansar(10);
console.log(mascota.energia);

//4 Agregar una nueva propiedad
mascota.vacunado = true;
console.log(mascota);

//5
mascota.verMedicamentos();

//------------------------------------------------------
//                Aplicacion de Tareas
//------------------------------------------------------
/* const tarea = {
  id: 1,
  titulo: "Lavar ropa",
  completad: false,
}; */

let tareas = [
  {
    id: 1,
    titulo: "Lavar ropa",
    completada: false,
  },
  {
    id: 2,
    titulo: "Estudiar",
    completada: false,
  },
  {
    id: 3,
    titulo: "Trabajar",
    completada: false,
  },
];

let nextId = 4;

const agregarTarea = (titulo) => {
  const nuevaTarea = {
    id: nextId++,
    titulo: titulo,
    completad: false,
  };

  tareas.push(nuevaTarea);
  tareas = [...tareas, nuevaTarea];
};

agregarTarea("Comer");
console.log(Object.entries(tareas));

tareas.pop();
