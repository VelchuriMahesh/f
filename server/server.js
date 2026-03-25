import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import authRoutes from './routes/authRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import postRoutes from './routes/postRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import videoRoutes from './routes/videoRoutes.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 4000);

// Middleware configuration
app.use(
  cors({
    origin: [process.env.CLIENT_URL || 'http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true
  })
);
app.use(
  helmet({
    crossOriginResourcePolicy: false
  })
);
app.use(compression());
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Route mounting
app.use('/api/auth', authRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/videos', videoRoutes);

// Global Error Handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`✅ Shrusara API running on port ${port}`);
});