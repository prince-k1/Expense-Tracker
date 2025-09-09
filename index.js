// const express = require('express');
// const app = express();
// const path = require('path');
// const sequelize = require('./utils/db-connection');


// const signUpRouter = require('./routes/signupRoute');
// const loginRouter = require('./routes/loginRoute');
// const expenseRoute = require('./routes/expenseRoute');

// const userTable = require('./models/userTable');
// const expenseTable = require('./models/expenseTable');


// app.use(express.json());
// app.use(express.urlencoded({extended: true}));
// app.set('view engine', 'ejs');
// app.set('views', path.resolve('./views'));
// app.use(express.static('public'));


// app.use('/signup', signUpRouter);
// app.use('/', loginRouter);
// app.use('/expense', expenseRoute);

// userTable.hasMany(expenseTable);
// expenseTable.belongsTo(userTable);

// sequelize.sync().then(() => {
//     app.listen(3000, () => console.log('Server running on 3000'));
// });

const express = require('express');
const session = require('express-session');
const path = require('path');
const sequelize = require('./utils/db-connection');

const signUpRouter = require('./routes/signupRoute');
const loginRouter = require('./routes/loginRoute');
const expenseRoute = require('./routes/expenseRoute');

const userTable = require('./models/userTable');
const expenseTable = require('./models/expenseTable');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));
app.use(express.static('public'));

// Session setup
app.use(session({
    secret: 'your_secret_key_here',
    resave: false,
    saveUninitialized: false
}));

// Associations
userTable.hasMany(expenseTable, { foreignKey: 'userId' });
expenseTable.belongsTo(userTable, { foreignKey: 'userId' });

// Routes
app.use('/signup', signUpRouter);
app.use('/', loginRouter);
app.use('/expense', expenseRoute);

sequelize.sync().then(() => {
    app.listen(3000, () => console.log('Server running on port 3000'));
});
