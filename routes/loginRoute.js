const express = require('express');
const route = express.Router();
const userTable = require('../models/userTable');

route.get('/', (req, res) => {
    res.render('login');
})

module.exports = route;