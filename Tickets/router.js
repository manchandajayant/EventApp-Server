const { Router } = require("express");
const Ticket = require("./model");
const router = new Router();
const User = require("../Users/model");
const Comment = require("../Comments/model");

router.post("/ticket", async (request, response, next) => {
  try {
    const { price, description, eventId, url, userId } = request.body;

    const entity = { price, description, eventId, url, userId };

    const ticket = await Ticket.create(entity);

    response.send(ticket);
  } catch (error) {
    next(error);
  }
});

router.get("/ticket", (req, res, next) => {
  //console.log("this is a get call to find all tickets", res.body);
  Ticket.findAll({
    attributes: ["id", "userId", "eventId", "price", "description"],
    include: User,
    raw: true
  })
    .then(ticket => {
      res.json(ticket);
    })
    .catch(next);
});

router.get("/ticket/:id", (req, res, next) => {
  //console.log("this is to fetch ticket by id");
  Ticket.findByPk(req.params.id, {
    include: [
      { model: Comment },
      {
        model: User,
        include: [Ticket]
      }
    ]
  })
    .then(ticket => {
      res.json(ticket);
    })
    .catch(next);
});

router.put("/ticket/:id", (req, res, next) => {
  Ticket.findByPk(req.params.id)
    .then(ticket => ticket.update(req.body))
    .then(ticket => res.send(ticket))
    .catch(next);
});

module.exports = router;
