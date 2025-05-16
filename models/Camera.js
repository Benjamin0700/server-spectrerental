import mongoose from 'mongoose';

const cameraSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
}, { timestamps: true });

const Camera = mongoose.model('Image', cameraSchema);
export default Camera;