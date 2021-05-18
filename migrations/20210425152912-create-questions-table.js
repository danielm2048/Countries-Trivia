"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("questions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      question_template_id: Sequelize.INTEGER,
      country_x: Sequelize.STRING,
      country_y: Sequelize.STRING,
      answer: Sequelize.STRING,
      option_1: Sequelize.STRING,
      option_2: Sequelize.STRING,
      option_3: Sequelize.STRING,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("questions");
  },
};
