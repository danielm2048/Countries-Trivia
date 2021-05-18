"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("country_data", {
      Country: { allowNull: false, primaryKey: true, type: Sequelize.STRING },
      Capital: Sequelize.STRING,
      Restaurant_Price_Index: Sequelize.INTEGER,
      Cost_of_Living_Index: Sequelize.INTEGER,
      Phones_per_1000: Sequelize.STRING,
      Crime_Index: Sequelize.INTEGER,
      Safety_Index: Sequelize.INTEGER,
      Health_Care_Index: Sequelize.INTEGER,
      Area_km2: Sequelize.STRING,
      Population: Sequelize.STRING,
      Density_popkm2: Sequelize.STRING,
      Price_To_Income_Ratio: Sequelize.INTEGER,
      Quality_of_Life_Index: Sequelize.INTEGER,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("country_data");
  },
};
