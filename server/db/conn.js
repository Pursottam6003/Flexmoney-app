const mysql = require('mysql2');

/** @type {import('mysql').Connection} */
var _db;

// q: process.env not owrking
// a: https://stackoverflow.com/questions/13394140/using-environment-variables-in-node-js-applications
module.exports = {
  connectToServer: function (callback) {
    // const db = mysql.createConnection({
    //   host: process.env.DB_HOST || 'localhost',
    //   user: process.env.DB_USER || 'root',
    //   password: process.env.DB_USER_PASSWORD || 'Rahul@12345678',
    //   database: process.env.DB_NAME || 'yogaDatabase'
    // });

    const db = mysql.createConnection(process.env.DB_URL || '');

    db.connect(function (err) {
      if (err) {
        return console.error('error: ' + err.message);
      }
      _db = db;
      console.log('Connected to the MySQL server.');
    })
  },

  getDb: () => _db
};