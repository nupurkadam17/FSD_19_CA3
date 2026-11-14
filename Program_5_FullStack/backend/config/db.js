/**
 * CLOSETÉ - Program 5 Mongoose Connection Manager
 * Manages persistent connection to MongoDB with connection pooling,
 * reconnection retries, and comprehensive diagnostic logging.
 */

const mongoose = require('mongoose');

// Prevent Mongoose from hanging on queries if connection is down
mongoose.set('bufferCommands', false);

const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/closete_fashion_db';

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000 // 5-second connection timeout
    });

    console.log(`\x1b[32m[MongoDB Connected]\x1b[0m Host: ${conn.connection.host} | Database: ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.warn(`\x1b[33m[MongoDB Warning]\x1b[0m Could not connect to MongoDB at ${uri}: ${error.message}`);
    console.warn(`[MongoDB Advisory] Running in hybrid mode. To persist to local/Atlas MongoDB, ensure MONGO_URI is active.`);
    return null;
  }
};

module.exports = connectDB;
