const path = require('path');
const express = require('express');
const userRoutes = require('./routes/user');
const bodyParser = require('body-parser');
const userAuth = require('./middlewares/auth');

const app = express()

app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')))

app.use('/user',userRoutes);
app.use('/auth',userAuth.userAuth);
app.use('',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','index.html'));
});

app.listen(3000,()=>console.log('Listening on port 3000'))