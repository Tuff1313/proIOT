// server.js
const express = require('express');
const mariadb = require('mariadb');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// MariaDB connection pool
const pool = mariadb.createPool({
  host: 'localhost', // your database host
  user: 'your_username', // your database username
  password: 'your_password', // your database password
  database: 'iv_monitor', // your database name
  connectionLimit: 5,
});

// Endpoint to get IV sensor data
app.get('/api/sensors', async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query('SELECT * FROM sensors'); // Adjust your table name as necessary
    res.json(rows);
  } catch (err) {
    res.status(500).send(err.message);
  } finally {
    if (conn) conn.release();
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
