const jwt = require('jsonwebtoken');
require('dotenv').config()

module.exports.userAuth = (req,res,next)=>{
    jwt.verify(req.headers.authentication,process.env.JWT_SECRET,(err,success)=>{
        if(err){
            console.log('Invalid Token');
            res.status(202).json({message:'login failed'})
        }else{
            next()
        }
    })
}