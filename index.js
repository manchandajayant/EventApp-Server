const express = require("express");
const app = express();
const cors = require("cors");
const jsonParser = express.json();
const corsMiddleWare = cors();

const port = process.env.PORT || 4000;

app.use(corsMiddleWare);
app.use(jsonParser);

app.listen(port, () => console.log(`Listening on port ${port}`));
