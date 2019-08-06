const Sequlizer = require('./models/index');

class Database {

  init() {
    this.db = Sequlizer.sequelize;
    this.testConnection();
    console.log('[DB] Initialized');
  }

  testConnection() {
    this.db
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
