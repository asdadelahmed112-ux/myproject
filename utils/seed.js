import mongoose from 'mongoose';
import Category from '../models/Category.js';
import Product from '../models/Product.js';

// Direct, non-SRV connection string that bypasses network DNS blocks
const DIRECT_ATLAS_URI = "mongodb://asdadelahmed112_db_user:ajhZ680c57PIJQhs@cluster0-shard-00-00.21q8lus.mongodb.net:27017,cluster0-shard-00-01.21q8lus.mongodb.net:27017,cluster0-shard-00-02.21q8lus.mongodb.net:27017/ecom_db?ssl=true&replicaSet=atlas-m9yuxh-shard-0&authSource=admin&retryWrites=true&w=majority";

const seed = async () => {
  try {
    console.log('Bypassing SRV DNS... Connecting directly to MongoDB Atlas nodes...');
    await mongoose.connect(DIRECT_ATLAS_URI);
    console.log('Connected! Cleaning up old collections...');
    
    await Category.deleteMany(); 
    await Product.deleteMany();
    
    console.log('Creating sample categories and products...');
    const c = await Category.create({ name: 'Electronics' });
    await Product.create([
      { name: 'Laptop', price: 999, stock: 10, category: c._id },
      { name: 'Smartphone', price: 499, stock: 20, category: c._id }
    ]);
    
    console.log('Database successfully seeded to Cloud Cluster!'); 
    process.exit(0);
  } catch (e) { 
    console.error(`Seeding Error: ${e.message}`); 
    process.exit(1); 
  }
};

seed();
