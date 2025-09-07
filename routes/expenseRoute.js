const express = require('express');
const route = express.Router();
const expenseTable = require('../models/expenseTable');
const bcrypt = require('bcrypt');

route.post('/', async (req, res) => {
    const {amount, desc, category} = req.body;
    await expenseTable.create({amount, desc, category});
    const data = await expenseTable.findAll();
    // console.log(data);
    res.render('userFrontend', {data});
})

module.exports = route;