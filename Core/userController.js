// userController.js
const db = require('./db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = "achieng"; // Ideally, store this in an environment variable

// User registration
exports.registerUser = (req, res) => {
  const { username, password } = req.body;

  // Hash the password
  const hashedPassword = bcrypt.hashSync(password, 8);

  const query = `INSERT INTO users (username, password) VALUES (?, ?)`;
  db.query(query, [username, hashedPassword], (err, result) => {
    if (err) {
      console.error('Error during registration:', err);
      return res.status(500).json({ error: 'Registration failed' });
    }
    res.status(201).json({ message: 'User registered successfully' });
  });
};

// User login
exports.loginUser = (req, res) => {
  const { username, password } = req.body;

  const query = `SELECT * FROM users WHERE username = ?`;
  db.query(query, [username], (err, results) => {
    if (err || results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = results[0];
    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).json({ auth: false, token: null, message: 'Invalid password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '24h' });

    res.status(200).json({ auth: true, token });
  });
};

// Middleware to verify JWT token
exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ auth: false, message: 'No token provided' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(500).json({ auth: false, message: 'Failed to authenticate token' });
    }

    // If everything is good, save the user ID for use in other routes
    req.userId = decoded.id;
    next();
  });
};
