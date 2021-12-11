require("dotenv").config();
const express = require("express");
const mongo = require ("./Shared/mongo");
const usersRoutes = require("./Routes/usersRoutes");
const postsRoutes = require("./Routes/postsRoutes");
const commentsRoutes = require("./Routes/commentsRoutes")
const app = express();
const cors =require("cors");

require("dotenv").config();

try {

    (async function(){

    await mongo.connect();

    app.use(express.json())
    
    app.use(cors());
    
    app.use((req,res,next)=>{
        console.log("Common middleware running");
        next();
    })
    app.use("/users",usersRoutes);

    app.use("/posts",postsRoutes);

    app.use("/comments",commentsRoutes);
    
    
    app.listen(process.env.PORT,()=>{
        console.log(`Server Running in the port ${process.env.PORT}`);
    })
})();

} catch (error) {
    console.log(error);
}

