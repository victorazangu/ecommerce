import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const uri = process.env.DB_CONNECTION_STRING;

const dbConnect = async () => {
    try {
        await mongoose.connect(uri);

        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
};

export default dbConnect;
