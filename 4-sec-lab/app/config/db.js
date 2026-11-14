const mongoose = require('mongoose');

const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOST,
  MONGO_PORT,
  MONGO_DB
} = process.env;

const dbCred = [
  encodeURIComponent(MONGO_USERNAME),
  encodeURIComponent(MONGO_PASSWORD)
].join(':');

const dbAddress = `${MONGO_HOST}:${MONGO_PORT}`;
const dbOptions = `authSource=${MONGO_DB}`;
const mongoUri  = `mongodb://${dbCred}@${dbAddress}/${MONGO_DB}?${dbOptions}`;

const connectDB = async () => {

  try {
    await mongoose.connect(mongoUri);
    console.log(`Connected to MongoDB database: ${MONGO_DB}`);
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
