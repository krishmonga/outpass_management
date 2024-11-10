const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Connection (Promise-based)
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
}).promise();

// Routes

// Home route to test API connection
app.get('/', (req, res) => {
  res.send('API is running...');
});

// User Registration
app.post('/api/register', async (req, res) => {
  const { username, password, email, userType } = req.body;
  try {
    const checkUserQuery = 'SELECT * FROM users WHERE username = ?';
    const [result] = await db.query(checkUserQuery, [username]);
    if (result.length > 0) {
      return res.status(400).json({ message: 'Username already exists. Please choose a different one.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = 'INSERT INTO users (username, email, password, userType) VALUES (?, ?, ?, ?)';
    await db.query(sql, [username, email, hashedPassword, userType]);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal Server Error. Please try again later.' });
  }
});

// User Login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const sql = 'SELECT * FROM users WHERE username = ?';

  try {
    const [result] = await db.query(sql, [username]);

    if (result.length > 0) {
      const user = result[0];
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const token = jwt.sign(
          { username: user.username, userType: user.userType },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
        );

        return res.json({
          message: 'Login successful',
          token: token,
          userType: user.userType,
          username: user.username,
        });
      } else {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Error logging in' });
  }
});

// Submit Outpass
app.post('/submit-outpass', async (req, res) => {
  const { rollNumber, hostelNumber, wardenName, contactNumber } = req.body;
  const query = `INSERT INTO outpass_requests (roll_number, hostel_number, warden_name, contact_number) VALUES (?, ?, ?, ?)`;

  try {
    await db.query(query, [rollNumber, hostelNumber, wardenName, contactNumber]);
    res.status(200).json({ message: 'Outpass submitted successfully' });
  } catch (err) {
    console.error('Error submitting outpass:', err.message);
    res.status(500).json({ message: 'Error submitting outpass: ' + err.message });
  }
});

// Update Outpass Status
app.post('/update-outpass-status', async (req, res) => {
  const { id, status } = req.body;
  const query = `UPDATE outpass_requests SET status = ? WHERE id = ?`;

  try {
    await db.query(query, [status, id]);
    res.status(200).json({ message: 'Outpass status updated successfully' });
  } catch (err) {
    console.error('Error updating outpass status:', err.message);
    res.status(500).json({ message: 'Error updating outpass status: ' + err.message });
  }
});

// Fetch Outpass Data
app.get('/fetch-outpass', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM outpass_requests');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching outpass data:', err.message);
    res.status(500).json({ error: 'Failed to fetch outpass data' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
