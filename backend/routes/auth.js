const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

const router = express.Router();
const jwtSecret = process.env.JWT_SECRET || '61bccb9c20b5bde6de78c1198b8a7fa300a8cec53075a9cb63cf646a89f83917';


// Register a new user
router.post(
  '/register',
  [body('email').isEmail(), body('password').isLength({ min: 6 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      user = new User({ username, email, password: await bcrypt.hash(password, 10) });
      await user.save();

      const payload = { userId: user.id };
      const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });

      res.json({ token });
    } catch (error) {
      res.status(500).send('Server Error');
    }
  }
);

// Login user and return token
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Create payload and sign token
    const payload = { userId: user.id };
    const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
