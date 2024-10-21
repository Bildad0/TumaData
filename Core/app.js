// app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const backupController = require('./backupController');
const userController = require('./userController');
const cron = require('node-cron'); // Import node-cron for scheduling tasks

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// Authentication routes
app.post('/register', userController.registerUser);
app.post('/login', userController.loginUser);

// Protect the backup and restore routes using JWT middleware
app.post('/backup', userController.verifyToken, backupController.createBackup);
app.get('/backups', userController.verifyToken, backupController.listBackups);
app.post('/restore/:backupName', userController.verifyToken, backupController.restoreBackup);

// Schedule automatic backups every day at midnight
cron.schedule('0 0 * * *', () => {
  console.log('Running scheduled backup');
  backupController.createBackupCron(); // Call the backup function directly without authentication
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
