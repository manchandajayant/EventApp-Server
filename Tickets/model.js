const Sequelize = require("sequelize");
const db = require("../db");

const Event = require("../Events/model");
const User = require("../Users/model");

const Ticket = db.define("ticket", {
  price: Sequelize.STRING,
  description: Sequelize.STRING,
  url: Sequelize.STRING
});

Ticket.belongsTo(Event);
Ticket.belongsTo(User);

Event.hasMany(Ticket);
User.hasMany(Ticket);

module.exports = Ticket;
