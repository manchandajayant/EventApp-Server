const express = require("express");
const app = express();
const cors = require("cors");
const jsonParser = express.json();
const corsMiddleWare = cors();
const eventRouter = require("./Events/router");
const authRouter = require("./Authorisation/routerLogin");
const userRouter = require("./Users/routerSignup");

const port = process.env.PORT || 4000;

app.use(corsMiddleWare);
app.use(jsonParser);
app.use(eventRouter);
app.use(authRouter);
app.use(userRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));
