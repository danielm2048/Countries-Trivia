const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Player extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.hasMany(models.Rating, { foreignKey: "playerId" });
		}
	}
	Player.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			name: DataTypes.STRING,
			score: DataTypes.INTEGER,
		},
		{
			// options
			sequelize,
			modelName: "Player",
			tableName: "players",
			timestamps: false,
		}
	);
	return Player;
};
