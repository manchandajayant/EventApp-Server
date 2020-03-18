const { Router } = require("express");
const Event = require("./model");
const router = new Router();
const Ticket = require("../Tickets/model");
const User = require("../Users/model");

router.post("/event", (req, res, next) => {
  console.log("this is a new event", req.body);
  Event.create(req.body)
    .then(event => res.json(event))
    .catch(next);
});

router.get("/event", (req, res, next) => {
  //console.log("this is a get call to find all events", res.body);
  Event.findAll({
    attributes: ["name", "id", "description", "url"],
    raw: true
  })
    .then(event => {
      res.json(event);
    })
    .catch(next);
});

router.get("/event/:id", (req, res, next) => {
  //console.log("this is to fetch event by id");
  Event.findByPk(req.params.id, { include: [Ticket] })
    .then(event => {
      res.json(event);
    })
    .catch(next);
});

router.put("/event/:id", (req, res, next) => {
  Event.findByPk(req.params.id)
    .then(event => event.update(req.body))
    .then(event => res.send(event))
    .catch(next);
});

router.delete("/event/:id", (req, res, next) => {
  Event.destroy({ where: { id: req.params.id } })
    .then(number => res.send({ number }))
    .catch(next);
});
module.exports = router;
