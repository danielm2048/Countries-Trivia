const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Question extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.belongsTo(models.QuestionTemplate, {
				foreignKey: "question_template_id",
			});
			this.hasMany(models.Rating, { foreignKey: "question_id", as: "QT" });
		}
	}
	Question.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			questionTemplateId: DataTypes.INTEGER,
			countryX: DataTypes.STRING,
			countryY: DataTypes.STRING,
			answer: DataTypes.STRING,
			option_1: DataTypes.STRING,
			option_2: DataTypes.STRING,
			option_3: DataTypes.STRING,
		},
		{
			// options
			sequelize,
			modelName: "Question",
			tableName: "questions",
			timestamps: false,
		}
	);
	return Question;
};
