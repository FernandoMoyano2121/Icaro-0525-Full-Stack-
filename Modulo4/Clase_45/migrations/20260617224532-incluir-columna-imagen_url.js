"use strict";

import { DataTypes } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  /**
   * Add altering commands here.
   *
   * Example:
   * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
   */

  await queryInterface.addColumn("productos", "imagen_url", {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: null,
  });
  console.log("Columna imagen_url agregada!");
}
export async function down(queryInterface, Sequelize) {
  /**
   * Add reverting commands here.
   *
   * Example:
   * await queryInterface.dropTable('users');
   */

  await queryInterface.removeColumn("productos", "imagen_url");
  console.log("Columna eliminada de productos");
}
