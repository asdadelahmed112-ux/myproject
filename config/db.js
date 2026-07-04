import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const DIRECT_ATLAS_URI = "mongodb://asdadelahmed112_db_user:ajhZ680c57PIJQhs@cluster0-shard-00-00.21q8lus.mongodb.net:27017,cluster0-shard-00-01.21q8lus.mongodb.net:27017,cluster0-shard-00-02.21q8lus.mongodb.net:27017/ecom_db?ssl=true&replicaSet=atlas-m9yuxh-shard-0&authSource=admin&retryWrites=true&w=majority";
    
    console.log('Connecting to cloud MongoDB Atlas via direct node channels...');
    const conn = await mongoose.connect(DIRECT_ATLAS_URI);
    console.log(`MongoDB Connected to Cloud Cluster: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database connection error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
