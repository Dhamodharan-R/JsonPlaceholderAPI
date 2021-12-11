const joi = require("joi");

const schema ={
    registerSchema:joi.object({
        name:joi.string().required() ,
        email:joi.string().email().required() ,
        password:joi.string().min(4).required(),
    }),
    loginSchema:joi.object({
        email:joi.string().email().required(),
        password:joi.string().min(4).required()
    }),
    createPostSchema:joi.object({
        userId:joi.number().required(),
        id:joi.number().required(),
        title:joi.string().required(),
        body:joi.string().required(),
    }),
    updatePostSchema:joi.object({
        userId:joi.number().required(),
        id:joi.number().required(),
        title:joi.string().required(),
        body:joi.string().required(),
    })
}
module.exports = schema
