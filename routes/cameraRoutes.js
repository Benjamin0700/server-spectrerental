import express from 'express';
import multer from 'multer';
import {
  uploadImage,
  getImages,
  getImageById,
  deleteImage,
  updateImage
} from '../controllers/cameraController.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Rasm yuklash
router.post('/', upload.single('upload'), uploadImage);

// Barcha rasmlarni olish
router.get('/', getImages);

// Bitta rasmni olish
router.get('/:id', getImageById);

// Rasmni o‘chirish
router.delete('/:id', deleteImage);

// Rasmni yangilash
router.put('/:id', upload.single('upload'), updateImage);

export default router;
