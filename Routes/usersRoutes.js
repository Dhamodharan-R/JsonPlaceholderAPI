const app = require("express").Router();
const usersServices = require("../Services/usersServices");

app.post("/register",usersServices.register );

app.post("/login",usersServices.login);


module.exports = app;