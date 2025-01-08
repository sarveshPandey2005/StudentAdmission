const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Optional, if you want JWT tokens

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB URI - Updated to use 'tempdata' database
const URI = 'mongodb://localhost:27017/tempdata'; // Use the 'tempdata' database

// MongoDB Connection
mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB Connection Error:', err));

// Admin schema for storing username and hashed password
const adminSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

// Admin model using the 'login' collection
const Admin = mongoose.model('login', adminSchema); // Updated collection name to 'login'

// Route for admin login
app.post('/admin/login', async (req, res) => {
  const { username, password } = req.body;

  // Check if the username exists in the database
  const admin = await Admin.findOne({ username });

  if (!admin) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }

  // Compare provided password with stored password using bcrypt
  const isMatch = await bcrypt.compare(password, admin.password);

  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }

  // If login is successful, send a success message (No JWT used)
  res.status(200).json({ message: 'Login successful' });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
