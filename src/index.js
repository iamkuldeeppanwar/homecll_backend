const cors = require("cors");
require("dotenv").config();
const express = require("express");
require("./mongodb/mongoose");
const userRouter = require("./router/user");
const userListRouter = require("./router/usersList");

const app = express();
const port = process.env.PORT || 4000;

//Add cors
app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(userListRouter);

app.listen(process.env.PORT || 4000, function () {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});
