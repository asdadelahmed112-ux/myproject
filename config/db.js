import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const dbUri = process.env.MONGO_URI;
    console.log('Connecting to cloud MongoDB Atlas via Direct Multi-Node Channels...');
    
    const conn = await mongoose.connect(dbUri);
    console.log(`🎉 MongoDB Cloud Connected Successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Database connection error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
