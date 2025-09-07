const express = require('express');
const route = express.Router();
const userTable = require('../models/userTable');
const bcrypt = require('bcrypt');
// const sequelize = require('../');

route.get('/', (req, res) => {
    res.render('home');
})

route.post('/',  async (req, res) => {
    try{
         const {name, email, password} = req.body;
        const e = await userTable.findOne({where: {email: email}});
        if(e){
            res.send('already exist');
        }else{
            bcrypt.hash(password, 10, async (err, hash)=> {
            await userTable.create({name, email, password: hash})
            res.render('home');
            })
        }
    }catch(err){
        console.log(err);
    }
   
})

module.exports = route;