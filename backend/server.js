require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const auth = require('./middleware/auth');
const app = express();
const Log = require('./models/Log'); // Keep this

// Connect to the database
connectDB();

// CORS setup
const allowedOrigins = [
  'https://bjjtraininglog.netlify.app',
  'https://master--bjjtraininglog.netlify.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth')); // Authentication route

// Existing routes
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Protect these routes with the auth middleware
app.get('/logs', auth, async (req, res) => {
  try {
    const logs = await Log.find({ user: req.user }).sort({ date: -1 }); // Only get logs for the authenticated user
    res.json(logs.map(log => ({
      ...log.toObject(),
      date: new Date(log.date).toLocaleDateString()
    })));
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

app.post('/log', auth, async (req, res) => {
  try {
    const newLog = new Log({ ...req.body, user: req.user }); // Attach user ID to the log entry
    const savedLog = await newLog.save();
    res.status(201).json(savedLog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Define the port and start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
