const { Router } = require("express");
const Event = require("./model");
const router = new Router();
const Ticket = require("../Tickets/model");

router.post("/event", (req, res, next) => {
  console.log("this is a new event", req.body);
  Event.create(req.body)
    .then(event => res.json(event))
    .catch(next);
});

router.get("/event", (req, res, next) => {
  //console.log("this is a get call to find all events", res.body);
  Event.findAll({ attriibutes: ["name"], raw: true })
    .then(event => {
      res.json(event);
    })
    .catch(next);
});

router.get(
  "/evennt/:id", // path with an id parameter
  async (request, response, next) => {
    // handler callback
    try {
      // pick what parameters you want
      const { id } = request.params;

      const query = {
        include: [
          // include takes an array
          Ticket // Family.hasMany(Species)
        ]
      };

      // read single family by id using a promise
      const event = await Event.findByPk(
        id, // the id of the target record
        query // unlike findAll, findByPk takes two arguments.
      );

      response.send(event);
    } catch (error) {
      next(error);
    }
  }
);

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
