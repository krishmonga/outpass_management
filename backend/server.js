const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to the database.');
});

// Define Routes
app.get('/', (req, res) => {
    res.send('API is running...');
});
// User Registration
app.post('/api/register', (req, res) => {
  const { username, password, userType } = req.body;
  const sql = 'INSERT INTO users (username, password, userType) VALUES (?, ?, ?)';
  db.query(sql, [username, password, userType], (err, result) => {
      if (err) {
          return res.status(500).json({ error: 'Error registering user' });
      }
      res.status(201).json({ message: 'User registered successfully' });
  });
});
// User Login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(sql, [username, password], (err, result) => {
      if (err) {
          return res.status(500).json({ error: 'Error logging in' });
      }
      if (result.length > 0) {
          res.json({ message: 'Login successful', user: result[0] });
      } else {
          res.status(401).json({ message: 'Invalid credentials' });
      }
  });
});

// Starting the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
