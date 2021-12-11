const Joi = require("joi");
const { ObjectId } = require("mongodb");
const mongo = require("../Shared/mongo");
const {createPostSchema,updatePostSchema} =require("../Shared/schema");

module.exports ={

    async getall (req,res){

        try {
            const data = await mongo.db.collection("posts").aggregate([
     
                {$lookup:{
                    from:"usersinfo",
                    localField:"userId",
                    foreignField:"id",
                    as:"userinfo"
                }} ,
              
            ]).toArray();
              
            
               res.send(data);
            
        } catch (error) {
            console.log(error)
        }

     },

     async get (req,res){

        try {

            const data = await mongo.db.collection("posts").find().toArray();
            res.send(data);
            
        } catch (error) {
            console.log(error)
        }


     
     },

     async post (req,res){

        try {
            const{value,error} = await createPostSchema.validate(req.body);
            if(error)
            return res.send(error); 
        
            await mongo.db.collection("posts").insertOne(value);
            res.send(value);
            
        } catch (error) {
            console.log(error)
        }

    
    },

    async put (req,res){
        
        try {
            const{value,error} = await updatePostSchema.validate(req.body);
            if(error)
            return res.send(error); 
        
            const {value:val} = await mongo.db.collection("posts").findOneAndUpdate({_id:ObjectId(req.params.id)},{$set:{...req.body}},{returnDocument:"after"});
            res.send(val)
            
        } catch (error) {
            console.log(error);
        }

    
    },

    async delete (req,res){

        try {
           data = await mongo.db.collection("posts").remove({_id:ObjectId(req.params.id)})
            res.send(data);
            
        } catch (error) {
            console.log(error);
        }
    
    }
    

}