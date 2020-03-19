const { Router } = require("express");
const Comment = require("./model");
const router = new Router();
const Ticket = require("../Tickets/model");

router.post("/comment", async (request, response, next) => {
  try {
    const { description, ticketId } = request.body;

    const entity = { description, ticketId };

    const comment = await Comment.create(entity);

    response.send(comment);
  } catch (error) {
    next(error);
  }
});

router.get("/comment/:ticketId", (req, res, next) => {
  //console.log("this is a get call to find all comments", res.body);
  const { ticketId } = req.params;
  Comment.findAll({
    where: { ticketId },
    include: [
      {
        model: Ticket
      }
    ]
  })
    .then(comment => {
      res.json(comment);
    })
    .catch(next);
});

router.get("/comment", (req, res, next) => {
  //console.log("this is a get call to find all tickets", res.body);
  Comment.findAll({ attriibutes: ["id"], raw: true })
    .then(comment => {
      res.json(comment);
    })
    .catch(next);
});

module.exports = router;
