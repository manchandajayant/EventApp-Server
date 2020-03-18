const { Router } = require("express");
const bcrypt = require("bcrypt");
const { toJWT } = require("./jwt");
const User = require("../Users/model");
const auth = require("./middleware");

const router = new Router();

router.post("/login", (request, response, next) => {
  const email = request.body.email;
  const password = request.body.password;
  if (!email || !password) {
    response.status(400).send("PLease enter a valid email and password");
  } else {
    User.findOne({ where: { email: request.body.email } })
      .then(user => {
        if (!user) {
          response
            .status(400)
            .send({ message: "User with this email does not exist" });
        } else if (bcrypt.compareSync(request.body.password, user.password)) {
          response.send({ id: user.id, jwt: toJWT({ userId: user.id }) });
        } else {
          response.send(400).send({
            message: "Incorrect Password"
          });
        }
      })
      .catch(error => {
        console.error(error);
        response.status(500).send({ message: "Something went wrong" });
      });
  }
});

router.get("/secret-endpoint", auth, (request, response, next) => {
  response.send({
    message: `Thanks for visiting the secret endpoint,${request.user.email}`
  });
});

module.exports = router;
