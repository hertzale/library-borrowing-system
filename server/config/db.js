const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is missing. Check server/.env');
  }
  await mongoose.connect(uri, { dbName: 'Library-Borrowing' });
  console.log('MongoDB connected: Library-Borrowing');
};

module.exports = connectDB;