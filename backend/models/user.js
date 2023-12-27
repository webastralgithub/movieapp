const { DataTypes } = require("sequelize");
const db = require('../config/db');

const User = db.define("user", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

});

module.exports = User;
