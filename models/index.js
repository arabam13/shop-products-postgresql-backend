const { Sequelize } = require("sequelize");
const config = require("../config/db.config.js");

const sequelize = new Sequelize(
  process.env.db_name,
  process.env.user,
  process.env.password,
  config
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.products = require("./products.model.js")(sequelize, Sequelize);

module.exports = db;
