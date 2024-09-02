import express, { json } from 'express';
import { connect } from 'mongoose';
import { config } from 'dotenv';
import cors from 'cors'; // Import CORS middleware
import userRoutes from './routes/userRoutes.js';
import messageRoutes from './routes/messageRoutes.js';

config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON
app.use(json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api', messageRoutes);

// Sample route to test the server
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Connect to MongoDB
connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('MongoDB connection error:', error));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
