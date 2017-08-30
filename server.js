const express = require("express");
const bodyParser = require("body-parser");
const mustacheExpress = require("mustache-express");
const expressValidator = require("express-validator");
const path = require("path");
const port = process.env.PORT || 8000;
const models = require("./models");
const app = express();

app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

app.use(express.static(path.join(__dirname, "./public")));

app.listen(port, function () {
    console.log(`Server is running on port ${port}`);
})