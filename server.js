// server.js
import express from 'express';
import mongoose from 'mongoose';
import imageRoutes from './routes/cameraRoutes.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 5000;

// __dirname o‘rniga bu 2 qatordan foydalanamiz (ES module uchun)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MongoDB ulanish
mongoose.connect('mongodb+srv://jalolsoxiddinov777:ODhNX8q9ewksZ3sl@cluster.dqa55z5.mongodb.net/images?retryWrites=true&w=majority&appName=cluster')
    .then(() => console.log('✅ MongoDB ulandi'))
    .catch(err => console.error('❌ MongoDB ulanmadi:', err));

// Middleware
app.use(cors()); // 💡 Bu barcha domenlarga ruxsat beradi
// Yoki faqat 127.0.0.1:5500 ga:
app.use(cors({
    origin: 'http://127.0.0.1:5500'
}));
app.use(express.json());

// uploads papkasini ochiq qilish (hamma kirishi mumkin bo'lishi uchun)
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Upload fayllarni xizmatga qo‘shish
app.use('/uploads', express.static(path.resolve('uploads')));

// Upload papkasini public qilib beramiz
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')))

// API marshrutlari
app.use('/api/camera', imageRoutes);

// Server ishga tushurish
app.listen(PORT, () => {
    console.log(`🚀 Server http://localhost:${PORT} da ishlayapti`);
});
