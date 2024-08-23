const mongoose = require('mongoose');
const config = require('config'); // Ensure you install config package with npm i config
const db = process.env.MONGO_URI || config.get('mongoURI'); // From your .env or default.json

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
