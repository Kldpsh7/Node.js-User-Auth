const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports.getLoginPage = (req,res,next)=>{
    res.sendFile(path.join(__dirname,'../','views','login.html'));
}

module.exports.postLogin = (req,res,next)=>{
    const badData = [null,undefined,'',' '];
    if(badData.includes(req.body.email) | badData.includes(req.body.password)){
        res.status(203).json({message:'Fill all fields properly'})
        return
    }
    fs.readFile('./userdata.txt',(err,data)=>{
        if(err){
            console.log(err)
        }else{
            users = JSON.parse(data.toString());
            userIndex = users.findIndex(u=>u.email===req.body.email);
            if(userIndex<0){
                res.status(202).json({message:'User Not Found'});
                return
            }
            req.user=users[userIndex];
            bcrypt.compare(req.body.password,users[userIndex].password,(err,success)=>{
                if(!success){
                    res.status(202).json({message:'Wrong Password'});
                    return
                }
                const token = jwt.sign(req.user,process.env.JWT_SECRET);
                res.status(201).json({message:'Login Successful',token:token});
            })
        }
    })
}

module.exports.getSignupPage = (req,res)=>{
    res.sendFile(path.join(__dirname,'../','views','signup.html'))
}

module.exports.postSignup = (req,res)=>{
    const badData = [null,undefined,'',' '];
    if(badData.includes(req.body.name) | badData.includes(req.body.email) | badData.includes(req.body.password)){
        console.log('Bad Data received');
        res.status(203).json({message:'Fill all fields properly'})
        return
    }
    fs.readFile('./userdata.txt',(err,data)=>{
        if(data){
            users = data.length==0? [] : JSON.parse(data.toString());
            const name=req.body.name;
            const email=req.body.email;
            
            userIndex = users.findIndex(u=>u.email === email);
            if(userIndex>=0){
                console.log('User already exists');
                res.status(203).json({message:'User With this Email alreay exists, login'})
                return
            }

            bcrypt.hash(req.body.password,10,(err,hash)=>{
                const obj={email:email,name:name,password:hash};
                users.push(obj);
                fs.writeFile('./userdata.txt',JSON.stringify(users),(error,success)=>{
                    if(err){console.log(err)}
                    else{res.status(201).json({message:'Loign Successful'})}
                })
            })
        }else{
            console.log(err)
        }
    })
}