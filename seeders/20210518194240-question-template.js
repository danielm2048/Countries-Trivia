"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "QuestionTemplate",
      [
        {
          type: "1",
          question: "Which country is most populous?",
          relevantColumn: "Population",
          desc: "0",
        },
        {
          type: "1",
          question: "Which country is least populous?",
          relevantColumn: "Population",
          desc: "1",
        },
        {
          type: "1",
          question: "Which country is the largest by total area?",
          relevantColumn: "Area_km2",
          desc: "0",
        },
        {
          type: "1",
          question: "Which country is the smallest by total area?",
          relevantColumn: "Area_km2",
          desc: "1",
        },
        {
          type: "1",
          question: "Which country is the most densely populated?",
          relevantColumn: "Density_popkm2",
          desc: "0",
        },
        {
          type: "1",
          question: "Which country is the least densely populated?",
          relevantColumn: "Density_popkm2",
          desc: "1",
        },
        {
          type: "1",
          question: "Which country has the most cell phones per person?",
          relevantColumn: "Phones_per_1000",
          desc: "0",
        },
        {
          type: "2",
          question: "What is the capital of X?",
          relevantColumn: "Capital",
          desc: "0",
        },
        {
          type: "2",
          question: "How many people live in X?",
          relevantColumn: "Population",
          desc: "0",
        },
        {
          type: "2",
          question: "In what continent is X?",
          relevantColumn: "Continent",
          desc: "0",
        },
        {
          type: "3",
          question: "Are there more people in X than in Y?",
          relevantColumn: "Population",
          desc: "0",
        },
        {
          type: "3",
          question: "Is X larger than Y?",
          relevantColumn: "Area_km2",
          desc: "0",
        },
        {
          type: "3",
          question: "Does X have a higher population density than Y?",
          relevantColumn: "Density_popkm2",
          desc: "0",
        },
        {
          type: "3",
          question:
            "Is the quality of life in X higher than the quality of life in Y?",
          relevantColumn: "Quality_of_Life_Index",
          desc: "0",
        },
        {
          type: "3",
          question: "Is the crime rate of X higher than the crime rate in Y?",
          relevantColumn: "Crime_Index",
          desc: "0",
        },
        {
          type: "3",
          question:
            "Are restaurants in X more expensive than restaurants in Y?",
          relevantColumn: "Restaurant_Price_Index",
          desc: "0",
        },
        {
          type: "1",
          question: "Which country has the most people in health care?",
          relevantColumn: "Health_Care_Index",
          desc: "0",
        },
        {
          type: "1",
          question: "Which country is the safest?",
          relevantColumn: "Safety_Index",
          desc: "0",
        },
        {
          type: "1",
          question: "Which country has the least cost of living?",
          relevantColumn: "Cost_of_Living_Index",
          desc: "1",
        },
        {
          type: "3",
          question: "Is the price to income ratio in X greater than Y?",
          relevantColumn: "Price_To_Income_Ratio",
          desc: "0",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("QuestionTemplate", null, {});
  },
};
