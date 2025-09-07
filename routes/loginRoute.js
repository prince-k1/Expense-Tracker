const express = require('express');
const route = express.Router();
const userTable = require('../models/userTable');
const bcrypt = require('bcrypt');

route.get('/', (req, res) => {
    res.render('login');
})


route.post('/',  async (req, res) => {
    const {name, email, password} = req.body;
    const e = await userTable.findOne({where: {email: email}});
    console.log('emaia' ,e);
    if(e){
        bcrypt.compare(password, e.dataValues.password, (err, result) => {
            if(err){
                res.send('Something went wrong');
            }
            if(result){
                res.send('User Login successfully');
            }else{
                res.send('Password is incorrect');
            }
        })
    }else{
        
        res.send('User not found');
    }
})


module.exports = route;