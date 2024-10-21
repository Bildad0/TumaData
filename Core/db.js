// db.js
const mysql = require('mysql2');

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',          // Change to your MySQL user
  password: "Achieng'9&",  // Change to your MySQL password
  database: 'backup_system',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

module.exports = db;
