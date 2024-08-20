const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors package
const app = express();

const port = process.env.PORT || 5000;

// Use CORS to allow cross-origin requests, If you want to restrict access to only your (local) React app use the origin middleware as follows...
app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.json());

// Replace with your own MongoDB connection string
const mongoURI = 'mongodb+srv://dcllive090:6Q3Xu1CytuOy7Iuh@cluster0.ufi6b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Server is running!');
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
