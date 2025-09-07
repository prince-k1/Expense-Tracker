const express = require('express');
const app = express();
const path = require('path');
const sequelize = require('./utils/db-connection');


const signUpRouter = require('./routes/signupRoute');
const loginRouter = require('./routes/loginRoute');
const expenseRoute = require('./routes/expenseRoute');


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));
app.use(express.static('public'));


app.use('/signup', signUpRouter);
app.use('/', loginRouter);
app.use('/expense', expenseRoute);

sequelize.sync().then(() => {
    app.listen(3000, () => console.log('Server running on 3000'));
});
