import express from 'express';
import mongoose from 'mongoose';
import bodyparser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './Router/user.js';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(bodyparser.json());
app.use(express.json());

// Routes
app.use('/api/user', userRoutes); // e.g., http://localhost:3000/api/user/create

// Environment variables
const PORT = process.env.PORT || 3000;
const MONGOURL = process.env.MONGODB_URL;

// MongoDB Connection
mongoose.connect(MONGOURL)
    .then(() => {
        console.log("✅ Database connected successfully");
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);

        });
    })
    .catch((error) => {
        console.error("❌ MongoDB connection error:", error.message);
    });