const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class QuestionTemplate extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	QuestionTemplate.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			type: DataTypes.INTEGER,
			question: DataTypes.STRING,
			desc: DataTypes.BOOLEAN,
			relevantColumn: DataTypes.STRING,
		},
		{
			// options
			sequelize,
			modelName: "QuestionTemplate",
			tableName: "questions-templates",
			timestamps: false,
		}
	);
	return QuestionTemplate;
};
