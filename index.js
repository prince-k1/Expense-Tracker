const express = require('express');
const app = express();
const path = require('path');
const signUpRouter = require('./routes/signupRoute');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));
app.use(express.static('public'));

app.use('/', signUpRouter);

app.listen(3000, () => console.log('running'));
