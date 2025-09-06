const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("expense-tracker", "root", "675859", {
  host: "localhost",
  dialect: "mysql",
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("connection created");
  } catch (err) {
    console.log(err);
  }
})();

module.exports = sequelize;