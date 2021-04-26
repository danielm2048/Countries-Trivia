const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Country extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Country.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			country: DataTypes.STRING,
			capital: DataTypes.STRING,
			continent: DataTypes.STRING,
			restaurantPriceIndex: DataTypes.INTEGER,
			costOfLivingIndex: DataTypes.INTEGER,
			phonesPer1000: DataTypes.INTEGER,
			crimeIndex: DataTypes.INTEGER,
			safetyIndex: DataTypes.INTEGER,
			healthCareIndex: DataTypes.INTEGER,
			areaKm2: DataTypes.INTEGER,
			population: DataTypes.INTEGER,
			densityPopkm2: DataTypes.INTEGER,
			qualityOfLifeIndex: DataTypes.INTEGER,
			priceToIncomeRatio: DataTypes.INTEGER,
		},
		{
			// options
			sequelize,
			modelName: "Country",
			tableName: "country_data",
			timestamps: false,
		}
	);
	return Country;
};
