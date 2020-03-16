const Sequelize = require("sequelize");
const db = require("../db");

const Ticket = db.define("ticket", {
  price: Sequelize.STRING,
  description: Sequelize.STRING,
  url: Sequelize.STRING
});

module.exports = Ticket;
