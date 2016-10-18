const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.load({ path: '.env' });
/**
 * Connect to MongoDB.
 */

mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
mongoose.connection.on('error', () => {
  console.error('MongoDB Connection Error. Please make sure that MongoDB is running. db.js');
  process.exit(1);
});

module.exports = mongoose;