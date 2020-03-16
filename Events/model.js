const Sequelize = require("sequelize");
const db = require("../db");

const Event = db.define("event", {
  name: Sequelize.STRING,
  description: Sequelize.STRING,
  url: Sequelize.STRING,
  startDate: Sequelize.STRING,
  endDate: Sequelize.STRING
});

module.exports = Event;
