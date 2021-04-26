const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Rating extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.belongsTo(models.Player, { foreignKey: "playerId" });
		}
	}
	Rating.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			questionId: DataTypes.INTEGER,
			playerId: DataTypes.INTEGER,
			rating: DataTypes.INTEGER,
		},
		{
			// options
			sequelize,
			modelName: "Rating",
			tableName: "ratings",
			timestamps: false,
		}
	);
	return Rating;
};
