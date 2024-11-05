
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt'); // Import bcrypt

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
app.post('/api/register', async (req, res) => {
    const { username, password, userType } = req.body;
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
        const sql = 'INSERT INTO users (username, password, userType) VALUES (?, ?, ?)';
        db.query(sql, [username, hashedPassword, userType], (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error registering user' });
            }
            res.status(201).json({ message: 'User registered successfully' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error hashing password' });
    }
});

// User Login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, [username], async (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error logging in' });
        }
        if (result.length > 0) {
            const user = result[0]; // Get the first user (should be unique)
            // Check password
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                res.json({
                    message: 'Login successful',
                    userType: user.userType, // Send back the user type
                    username: user.username // You can send more user details if needed
                });
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    });
});

// Starting the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
