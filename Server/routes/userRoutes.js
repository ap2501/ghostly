import { Router } from 'express';
import User from '../models/User.js';
import bcryptjs from 'bcryptjs';
const { hash, compare } = bcryptjs;


import jwt from 'jsonwebtoken';
const { sign } = jwt;



const router = Router();

// Register a new user
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if the username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ error: 'Username already in use. Please try a different username.' });
        }

        // Create unique link
        const uniqueLink = `${req.protocol}://${req.get('host')}/u/${username}`;

        // Create new user
        const newUser = new User({ username, password, uniqueLink });
        await newUser.save();

        res.status(201).json({ message: 'User registered', uniqueLink });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Failed to register user' });
    }
});


// User login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username:username });

        if (!user || !(await compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Failed to login' });
    }
});


router.get('/', async (req, res) => {
    try {
      const users = await User.find(); // Fetch all users from the database
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch users', error: error.message });
    }
  });

export default router;
