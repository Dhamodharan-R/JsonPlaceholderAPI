const{MongoClient} = require("mongodb");
require("dotenv").config()

/* const URL = "mongodb://localhost:27017";
const dbName = "cms"; */
const client = new MongoClient(process.env.URL);


module.exports={
    db:null,

     async connect() {

        await client.connect();
        console.log('Connected successfully to server');
        this.db = client.db(process.env.DBNAME);
        console.log(`Selected to db ${process.env.DBNAME}`);
      
    }
}

