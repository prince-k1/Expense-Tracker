// const express = require('express');
// const route = express.Router();
// const userTable = require('../models/userTable');
// const bcrypt = require('bcrypt');

// route.get('/', (req, res) => {
//     res.render('login');
// })


// route.post('/',  async (req, res) => {
//     const {name, email, password} = req.body;
//     const e = await userTable.findOne({where: {email: email}});
//     if(e){
//         bcrypt.compare(password, e.dataValues.password, (err, result) => {
//             if(err){
//                 res.send('Something went wrong');
//             }
//             if(result){
//                 res.render('userFrontend');
//             }else{
//                 res.send('Password is incorrect');
//             }
//         })
//     }else{
        
//         res.send('User not found');
//     }
// })


// module.exports = route;

const express = require('express');
const route = express.Router();
const userTable = require('../models/userTable');
const bcrypt = require('bcrypt');

route.get('/', (req, res) => {
    res.render('login');
});

route.post('/', async (req, res) => {
    const { email, password } = req.body;
    const user = await userTable.findOne({ where: { email } });
    if(user){
        bcrypt.compare(password, user.password, (err, result) => {
            if(err){
                return res.send('Something went wrong');
            }
            if(result){
                req.session.user = { id: user.id, name: user.name };
                res.redirect('/expense');
            }else{
                res.send('Password is incorrect');
            }
        });
    } else {
        res.send('User not found');
    }
});

module.exports = route;
