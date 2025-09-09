// const express = require('express');
// const route = express.Router();
// const expenseTable = require('../models/expenseTable');
// const bcrypt = require('bcrypt');

// route.post('/', async (req, res) => {
//     const {amount, desc, category} = req.body;
//     await expenseTable.create({amount, desc, category});
//     const data = await expenseTable.findAll();
//     console.log('data', data);
//     if(data){
//         res.render('userFrontend', {data});
//     }else{
//         res.render('userFrontend');
//     }
    
// })

// module.exports = route;

const express = require('express');
const route = express.Router();
const expenseTable = require('../models/expenseTable');

route.get('/', async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/');
    }
    const data = await expenseTable.findAll({
        where: { userId: req.session.user.id }
    });
    res.render('userFrontend', { name: req.session.user.name, data });
});

route.post('/', async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/');
    }
    const { amount, desc, category } = req.body;
    await expenseTable.create({
        amount,
        desc,
        category,
        userId: req.session.user.id
    });
    const data = await expenseTable.findAll({
        where: { userId: req.session.user.id }
    });
    res.render('userFrontend', { name: req.session.user.name, data });
});

route.post('/delete/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await expenseTable.destroy({
            where: { id: id }
        });
        const data = await expenseTable.findAll();
        res.render('userFrontend', { data, name: req.session.user.name, data }); 
    } catch (error) {
        console.error('Error deleting expense:', error);
        res.status(500).send('Error deleting expense');
    }
});

module.exports = route;
