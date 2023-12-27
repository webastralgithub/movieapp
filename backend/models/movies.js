const { DataTypes } = require("sequelize");
const db = require('../config/db');

const Movie = db.define("movie", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  publishYear: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true, // Adjust based on your requirements, whether image is required or not
  },
});

module.exports = Movie;
