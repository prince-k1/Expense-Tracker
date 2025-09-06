const express = require('express');
const route = express.Router();
const userTable = require('../models/userTable');
// const sequelize = require('../');

route.get('/', (req, res) => {
    res.render('home');
})

route.post('/',  async (req, res) => {
    const {name, email, password} = req.body;
    const e = await userTable.findOne({where: {email: email}});
    if(e){
        res.render('home');
    }else{
        await userTable.create({name, email, password});
        res.render('home');
    }
})

module.exports = route;