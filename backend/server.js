import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import { connectDB } from './config/db.js';
import userRouter from './routes/userRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import resumeRoutes from './routes/resumeRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
connectDB();
  
app.use(express.json());
app.use('/api/auth', userRouter);
app.use('/api/resume', resumeRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads'),{
  setHeaders: (res, path) => {
    res.set('Access-Control-Allow-Origin', 'https://resumecraft-8b31.onrender.com/'); // Adjust the origin as needed
  }
}));


app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})