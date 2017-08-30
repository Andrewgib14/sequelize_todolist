const express = require("express");
const bodyParser = require("body-parser");
const mustacheExpress = require("mustache-express");
const expressValidator = require("express-validator");
const path = require("path");
const port = process.env.PORT || 8000;
const models = require("./models");
const app = express();
const todo = models.todo;

app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, "./public")));

app.get("/", function (req, res) {
    todo.findAll().then(function (todos) {
        return res.render("index", { todos: todos })
    });
})

app.post("/toDoList", function (req, res) {
    console.log(req.body);
    todo.build({
        item: req.body.item,
        is_complete: 'f'
    }).save().then(function (newTodo) {
        console.log(newTodo.item);
    })

    return res.redirect("/");
})

app.post("/completed", function (req, res) {
    todo.update({
        is_complete: 't'
    }, {
            where: {
                item: req.body.item
            }
        }).then(function (todos) { });
    return res.redirect("/");
})

app.listen(port, function () {
    console.log(`Server is running on port ${port}`);
})


// delete complete todo from the todolist after it is added to the is completed column