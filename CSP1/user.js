const express = require('express');
const router = express.Router();
const connection = require('./connection');

// Get all registrations
router.get('/registration', (req, res) => {
    const query = "SELECT * FROM register";
    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        } else {
            return res.status(500).json(err);
        }
    });
});

// Delete a registration by username
router.delete('/registration/:name', (req, res) => {
    const name = req.params.name;
    const query = "DELETE FROM register WHERE name = ?";
    connection.query(query, [name], (err, results) => {
        if (err) {
            console.error('Error deleting registration:', err);
            return res.status(500).json({ message: 'Server error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'Registration deleted successfully' });
    });
});

// Update a registration by username
router.patch('/registration/:name', (req, res) => {
  const name = req.params.name;
  const { email, password } = req.body;
  const query = "UPDATE register SET email = ?, password = ? WHERE name = ?";
  connection.query(query, [email, password, name], (err, results) => {
      if (err) {
          console.error('Error updating registration:', err);
          return res.status(500).json({ error: err.message });
      }
      if (results.affectedRows === 0) {
          return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User updated successfully" });
  });
});
// Register a new user
router.post('/registration', (req, res) => {
  const { name, email, password } = req.body;
  
  // Check if username already exists
  const checkQuery = "SELECT * FROM register WHERE name = ?";
  connection.query(checkQuery, [name], (err, results) => {
      if (err) {
          console.error('Error checking name:', err);
          return res.status(500).send('Server error');
      }
      if (results.length > 0) {
          return res.status(400).json({ message: 'Username already taken' });
      }
      
      // Insert new user if username is unique
      const insertQuery = "INSERT INTO register (name, email, password) VALUES (?, ?, ?)";
      connection.query(insertQuery, [name, email, password], (err) => {
          if (err) {
              console.error('Error registering user:', err);
              return res.status(500).send('Error registering user');
          }
          console.log('User registered successfully');
          return res.status(200).json({ message: 'User registered successfully' });
      });
  });
});

// Register a new user
router.post('/register', (req, res) => {
    const { name, password, email } = req.body;
    const query = "INSERT INTO register (name, password, email) VALUES (?, ?, ?)";
    connection.query(query, [name, password, email], (err) => {
      if (err) {
        console.error('Error registering user: ', err);
        return res.status(500).send('Error registering user');
      } else {
        console.log('User registered successfully');
        return res.status(200).send('User registered successfully');
      }
    });
  })

module.exports = router;