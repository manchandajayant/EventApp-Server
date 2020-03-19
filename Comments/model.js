const Sequelize = require("sequelize");
const db = require("../db");

const Comment = db.define("comments", {
  description: Sequelize.TEXT
});

module.exports = Comment;
