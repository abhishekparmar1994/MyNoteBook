const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

const connectToMongo = async () => {
  try {
    await mongoose.connect('mongodb+srv://abhishek:wk2DK3LeX8XTl2pG@cluster0.lxyvbxr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    console.log('Connected to MongoDB Successfully!');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1); // Exit the process if the connection fails
  }
};

// Set Mongoose to use native JavaScript promises
mongoose.Promise = global.Promise;

module.exports = connectToMongo;
