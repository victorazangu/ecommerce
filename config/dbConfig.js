import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

const dbConnect = () => {
    const conn = mongoose
        .connect(process.env.DB_CONNECTION_STRING)
        .then(() => {
            console.log('database connected');
        })
        .catch((e) => console.log('error connecting', e));
    return conn;
};

export default dbConnect;
