import { Router } from 'express';
import Message from '../models/Message.js';
import User from '../models/User.js';
import authMiddleware from '../middleware/authMiddleware.js';


const router = Router();

// Send an anonymous message
router.post('/messages/:username', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const newMessage = new Message({
            userId: user._id,
            content: req.body.content,
        });

        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ error: 'Failed to send message' });
    }
});

// Get messages for a user
router.get('/messages',authMiddleware, async (req, res) => {
    try {
        const messages = await Message.find({ userId: req.userId });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve messages' });
    }
});

export default router;
