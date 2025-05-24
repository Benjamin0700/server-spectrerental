import Image from '../models/Camera.js';
import fs from 'fs';
import path from 'path';

// Rasm yuklash
export const uploadImage = async (req, res) => {
  try {
    const { name, title } = req.body;
    const upload = req.file ? req.file.filename : null;

    if (!name || !upload) {
      return res.status(400).json({ message: "Nomi va rasm majburiy!" });
    }

    const newImage = new Image({ name, title, upload });
    await newImage.save();
    res.status(201).json({ message: 'Rasm yuklandi', data: newImage });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ message: 'Xatolik yuz berdi', error: err.message });
  }
};

// Barcha rasmlarni olish
export const getImages = async (req, res) => {
  try {
    const images = await Image.find().sort({ createdAt: -1 });
    res.status(200).json(images);
  } catch (err) {
    res.status(500).json({ message: 'Rasmlar olinmadi', error: err.message });
  }
};

// Bitta rasmni ID bo'yicha olish
export const getImageById = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) return res.status(404).json({ message: 'Rasm topilmadi' });

    res.status(200).json(image);
  } catch (err) {
    res.status(500).json({ message: 'Rasm olinmadi', error: err.message });
  }
};

// Rasmni o'chirish
export const deleteImage = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) return res.status(404).json({ message: 'Rasm topilmadi' });

    const filePath = path.join('uploads', image.upload);
    fs.unlink(filePath, (err) => {
      if (err) console.error('Fayl o\'chirilmadi:', err);
    });

    await image.deleteOne();

    res.status(200).json({ message: 'Rasm o\'chirildi' });
  } catch (err) {
    res.status(500).json({ message: 'Rasm o\'chirilmadi', error: err.message });
  }
};

// Rasmni yangilash
export const updateImage = async (req, res) => {
  try {
    const { name, title } = req.body;
    const image = await Image.findById(req.params.id);

    if (!image) return res.status(404).json({ message: 'Rasm topilmadi' });

    if (req.file) {
      const oldFilePath = path.join('uploads', image.upload);
      fs.unlink(oldFilePath, (err) => {
        if (err) console.error('Eski fayl o\'chirilmadi:', err);
      });

      image.upload = req.file.filename;
    }

    if (name) image.name = name;
    if (title) image.title = title;

    await image.save();

    res.status(200).json({ message: 'Rasm yangilandi', data: image });
  } catch (err) {
    res.status(500).json({ message: 'Yangilashda xatolik', error: err.message });
  }
};
