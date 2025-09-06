const express = require('express');
const app = express();
const path = require('path');
const signUpRouter = require('./routes/signupRoute');
const sequelize = require('./utils/db-connection');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));
app.use(express.static('public'));


app.use('/signup', signUpRouter);

sequelize.sync().then(() => {
    app.listen(3000, () => console.log('Server running on 3000'));
});
