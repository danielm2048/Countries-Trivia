"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		/**
		 * Add altering commands here.
		 *
		 * Example:
		 * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
		 */

		await queryInterface.addColumn("players", "email", {
			type: Sequelize.STRING,
			allowNull: false,
		});

		await queryInterface.addColumn("players", "password", {
			type: Sequelize.STRING,
			allowNull: false,
		});
	},

	down: async (queryInterface, Sequelize) => {
		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 * await queryInterface.dropTable('users');
		 */

		await queryInterface.dropColumn("players", "email");

		await queryInterface.dropColumn("players", "password");
	},
};
