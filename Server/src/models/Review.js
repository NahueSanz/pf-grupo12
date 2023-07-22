const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Review",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      score: {
        type: DataTypes.INTEGER,
      },
      user: {
        type: DataTypes.STRING,
        unique: true,
      },
      review: {
        type: DataTypes.STRING,
        defaultValue: "",
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
