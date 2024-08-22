const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors package
const app = express();

const port = process.env.PORT || 5000;

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


app.use(express.json());

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.get('/logs', async (req, res) => {
  try {
    const logs = await Log.find().sort({ date: -1 }); // Sort logs by date descending
    // Format the date if necessary
    res.json(logs.map(log => ({
      ...log.toObject(),
      date: new Date(log.date).toLocaleDateString() // Convert to local date string if needed
    })));
  } catch (error) {
    res.status(500).send('Server Error');
  }
});


const Log = require('./models/Log');

app.post('/log', async (req, res) => {
  try {
    const newLog = new Log(req.body);
    const savedLog = await newLog.save();
    res.status(201).json(savedLog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
