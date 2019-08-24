const Sequlizer = require('./models/index');

class Database {

  constructor() {
    this.db = Sequlizer;
    this.testConnection();
  }

  testConnection() {
    this.db.sequelize
      .authenticate()
      .then(() => {
        console.log('[DB] Connection has been established successfully.');
      })
      .catch(err => {
        console.error('[DB] Unable to connect to the database:', err);
      });
  }

}
module.exports = new Database();
