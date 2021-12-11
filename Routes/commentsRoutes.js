const app = require("express").Router();

const commentsServices = require("../Services/commentsServices");

app.get("/", commentsServices.get)
app.get("/:id",commentsServices.getone)

module.exports = app