"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable("questions_templates", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      type: Sequelize.INTEGER,
      question: Sequelize.STRING,
      relevant_column: Sequelize.STRING,
      desc: Sequelize.BOOLEAN,
    });
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.dropTable("questions_templates");
  },
};
