const app = require("express").Router();
const postsServices = require("../Services/postsServices");

app.get("/all",postsServices.getall);

app.get("/",postsServices.get);
    
app.post("/",postsServices.post);

app.put("/:id",postsServices.put);

app.delete("/:id",postsServices.delete);



module.exports = app;