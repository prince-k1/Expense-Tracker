const express = require('express');
const route = express.Router();
const userTable = require('../models/userTable');

route.get('/', (req, res) => {
    res.render('login');
})


route.post('/',  async (req, res) => {
    const {name, email, password} = req.body;
    const e = await userTable.findOne({where: {email: email}});
    console.log('emaia' ,e);
    if(e){
        if(e.dataValues.password == password){
            res.send('User login Successfull');
        }else{
            res.send('User not authorized');
        }
    }else{
        
        res.send('User not found');
    }
})


module.exports = route;