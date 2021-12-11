const { Int32 } = require("mongodb");
const mongo = require("../Shared/mongo");

module.exports ={
    async get (req,res){

        try {
    
            const comments = await mongo.db.collection("comments").find().toArray();
    
            res.send(comments);
            
        } catch (error) {
            console.log(error)
        }
    
    
    },
    async getone (req,res){

        try {
    
            const comment = await mongo.db.collection("comments").find({"postId":Int32(req.params.id)}).toArray();
    
            res.send(comment);
            
        } catch (error) {
            console.log(error)
        }
    
    
    }
}