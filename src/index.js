import express from 'express';
import loaders from './loaders/index.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000; 
const mongoURI = process.env.MONGO_STRING || "mongodb://localhost:27017/hrsmart";


loaders(app);
connectDB(mongoURI);   

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
