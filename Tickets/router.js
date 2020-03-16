const { Router } = require("express");
const Ticket = require("./model");
const router = new Router();

router.post(
  "/ticket", // path
  async (request, response, next) => {
    // handler callback
    try {
      // decide what part of the body you want based on the model fields
      const { price, description, eventId, url, userId } = request.body;

      // make entity object
      const entity = { price, description, eventId, url, userId };

      // add a row to the database using a promise
      const ticket = await Ticket.create(entity);

      // send the object as a response
      response.send(ticket);
    } catch (error) {
      next(error);
    }
  }
);

router.get("/ticket", (req, res, next) => {
  //console.log("this is a get call to find all tickets", res.body);
  Ticket.findAll({ attriibutes: ["name"], raw: true })
    .then(ticket => {
      res.json(ticket);
    })
    .catch(next);
});

router.get("/ticket/:id", (req, res, next) => {
  //console.log("this is to fetch ticket by id");
  Ticket.findByPk(req.params.id)
    .then(ticket => {
      res.json(ticket);
    })
    .catch(next);
});

module.exports = router;
