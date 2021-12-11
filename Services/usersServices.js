const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongo = require ("../Shared/mongo");
const {registerSchema,loginSchema} =require("../Shared/schema");

module.exports={

    async register (req,res){

        try{
    
            const {value,error}=   await registerSchema.validate(req.body); 
            if(error)
            return res.send({error});
    
            const user = await mongo.db.collection("users").findOne({email:req.body.email});
        
            if(user)
              return  res.send({message: "Email already Exist Please Login"})
            
        
            const salt =await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password,salt);
            
            const data = await mongo.db.collection("users").insertOne(req.body);
            res.send({message:"User registered Successfully"});
    
        }catch(err){
            console.log(err);
        }
    
    
    },
    async login (req,res){

        try {
            const {value,error}=   await loginSchema.validate(req.body); 
            if(error)
            return res.send({error});

            const user = await mongo.db.collection("users").findOne({email:req.body.email});
            
            if(!user) return res.send({message:"Email doesn't exist, Please Register"});
    
            const isok = await bcrypt.compare(req.body.password,user.password);
    
            if(isok){
                const token = jwt.sign({...user},"jsonapi");
                
                res.send({Token:token,message:"User logged in sucessfully"})
            }
            else{
                return res.send({message:"Password is Wrong, Please try again"})
            }
    
    
            
        } catch (error) {
            console.log(error);
        }
    
    }
}