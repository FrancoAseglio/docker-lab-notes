const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoUri = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;
  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB at', mongoUri);
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
