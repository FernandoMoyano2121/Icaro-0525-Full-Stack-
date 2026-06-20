"use strict";

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  /**
   * Add seed commands here.
   *
   * Example:
   * await queryInterface.bulkInsert('People', [{
   *   name: 'John Doe',
   *   isBetaMember: false
   * }], {});
   */

  const ahora = new Date();
  await queryInterface.bulkInsert("productos", [
    {
      nombre: "Tablet Samsung Galaxy Tab S9",
      descripcion: 'Pantalla 11" AMOLED 120Hz, 256GB, S Pen incluido.',
      precio: 489999,
      stock: 18,
      creado_en: ahora,
      actualizado_en: ahora,
    },
    {
      nombre: 'Monitor LG UltraWide 34"',
      descripcion: "Panel IPS 3440x1440, HDR10, USB-C con carga 65W.",
      precio: 379999,
      stock: 12,
      creado_en: ahora,
      actualizado_en: ahora,
    },
  ]);
}

export async function down(queryInterface, Sequelize) {
  /**
   * Add commands to revert seed here.
   *
   * Example:
   * await queryInterface.bulkDelete('People', null, {});
   */

  await queryInterface.bulkDelete("productos", {
    nombre: ["Tablet Samsung Galaxy Tab S9", 'Monitor LG UltraWide 34"'],
  });
}
