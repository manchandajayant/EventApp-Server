const Sequelize = require("sequelize");
const db = require("../db");

const Event = require("../Events/model");
const User = require("../Users/model");
const Comment = require("../Comments/model");

const Ticket = db.define("ticket", {
  price: Sequelize.STRING,
  description: Sequelize.STRING,
  url: Sequelize.STRING
});

Ticket.belongsTo(Event);
Ticket.belongsTo(User);

Comment.belongsTo(Ticket);

Event.hasMany(Ticket);
User.hasMany(Ticket);
Ticket.hasMany(Comment);

module.exports = Ticket;
