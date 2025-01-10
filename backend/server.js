const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs'); // For password hashing
const jwt = require('jsonwebtoken'); // For token generation


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

// Schema for admission data
const admissionSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  dob: Date,
  gender: String,
  address: String,
  course: String,
  modeOfStudy: String,
  message: String,
});

// Schema for contact form data
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

// Admin schema for storing username and hashed password
const adminSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

// Models for `admissions`, `contact`, and `login` collections
const Admission = mongoose.model('admissions', admissionSchema);
const Contact = mongoose.model('contact', contactSchema);

// Admin model using the 'login' collection
const Admin = mongoose.model('login', adminSchema); // Updated collection name to 'login'

// Route for creating a new admin (for testing purposes)
app.post('/admin/create', async (req, res) => {
  const { username, password } = req.body;

  // Hash password before storing it
  const hashedPassword = await bcrypt.hash(password, 10);

  const newAdmin = new Admin({ username, password: hashedPassword });

  try {
    await newAdmin.save();
    res.status(201).send({ message: 'Admin created successfully' });
  } catch (err) {
    res.status(500).send({ message: 'Error creating admin', error: err });
  }
});

// Route for admin login
app.post('/admin/login', async (req, res) => {
  const { username, password } = req.body;

  // Check if the username exists in the database
  const admin = await Admin.findOne({ username });

  if (!admin) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }
  if (admin.password === password) {
    return res.json({ message: 'Password is correct' });
  }

  const isMatch = await bcrypt.compare(password, admin.password);

  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }

  // // Create a JWT token (valid for 1 hour)
  // const token = jwt.sign({ adminId: admin._id }, 'your_jwt_secret', { expiresIn: '1h' });

  // // Send response with the token
  // res.status(200).json({ message: 'Login successful', token });
});

// Routes
// Route for admissions form submissions
app.post(
  '/apply',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('A valid email is required'),
    body('phone').isLength({ min: 10, max: 10 }).withMessage('Phone must be 10 digits'),
    body('dob').notEmpty().withMessage('Date of birth is required'),
    body('gender').isIn(['Male', 'Female', 'Other']).withMessage('Invalid gender'),
    body('address').notEmpty().withMessage('Address is required'),
    body('course').notEmpty().withMessage('Course selection is required'),
    body('modeOfStudy').isIn(['Full-Time', 'Part-Time']).withMessage('Invalid mode of study'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const admission = new Admission(req.body);
      await admission.save();
      res.status(201).send({ message: 'Application submitted successfully' });
    } catch (err) {
      console.error('Error saving application:', err);
      res.status(500).send({ message: 'Error saving application', error: err });
    }
  }
);

// Route for contact form submissions
app.post('/contact', async (req, res) => {
  try {
    console.log('Contact data received:', req.body);
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).send({ message: 'Message submitted successfully' });
  } catch (err) {
    console.error('Error saving contact message:', err);
    res.status(500).send({ message: 'Error saving contact message', error: err });
  }
});


// Route for fetching all admissions
app.get('/api/admissions', async (req, res) => {
  try {
    const admissions = await Admission.find(); // Fetch all data from the 'admissions' collection
    res.json(admissions);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Student Model
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  modeOfStudy: {
    type: String,
    enum: ['Full-Time', 'Part-Time', 'Hybrid'],
    required: true,
  },
  message: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});
const Student = mongoose.model('Student', studentSchema);

// Accept Admission Route
app.post('/api/admissions/accept/:id', async (req, res) => {
  const admissionId = req.params.id;

  try {
    // Find the admission in the 'admissions' collection
    const admission = await Admission.findById(admissionId);
    if (!admission) {
      return res.status(404).json({ message: 'Admission not found' });
    }

    // Create a new student from the admission data
    const studentData = {
      name: admission.name,
      email: admission.email,
      phone: admission.phone,
      course: admission.course,
      dob: admission.dob,
      gender: admission.gender,
      address: admission.address,
      modeOfStudy: admission.modeOfStudy,
      message: admission.message,
    };

    const student = new Student(studentData);
    await student.save(); // Save to 'students' collection

    // Delete the admission from 'admissions' collection
    await Admission.findByIdAndDelete(admissionId);

    res.status(200).json({ message: 'Admission accepted and moved to students' });
  } catch (error) {
    console.error('Error accepting admission:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route for rejecting an admission (delete from 'admissions' collection)
app.delete('/api/admissions/reject/:id', async (req, res) => {
  const admissionId = req.params.id; // Extract the ID from the URL parameter

  // Check if the ID is valid
  if (!mongoose.Types.ObjectId.isValid(admissionId)) {
    return res.status(400).json({ message: 'Invalid admission ID' });
  }

  try {
    // Attempt to find and delete the admission by ID
    const admission = await Admission.findByIdAndDelete(admissionId);
    
    if (!admission) {
      return res.status(404).json({ message: 'Admission not found' });
    }

    // Send success response
    res.status(200).json({ message: 'Admission rejected and deleted' });
  } catch (error) {
    // Handle any other errors
    console.error(error);
    res.status(500).send('Server Error');
  }
});



// Routes
// Get all students from the database
app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find(); // Fetch all students
    res.json(students); // Return students data as JSON
  } catch (err) {
    res.status(500).json({ message: 'Error fetching students data', error: err.message });
  }
});


// Route to fetch all contact requests
app.get('/api/contact-requests', async (req, res) => {
  try {
    const contactRequests = await Contact.find(); // Fetch all contact requests from the database
    res.json(contactRequests); // Return the contact requests as JSON
  } catch (error) {
    console.error('Error fetching contact requests:', error);
    res.status(500).send('Server Error');
  }
});



// Basic route for server status
app.get('/', (req, res) => res.send('Server is running...'));

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
