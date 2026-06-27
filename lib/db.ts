import mongoose from 'mongoose';

const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("डेटाबेस कनेक्ट हो गया है!");
  } catch (error) {
    console.log("डेटाबेस में दिक्कत है:", error);
  }
};

export default connectDB;