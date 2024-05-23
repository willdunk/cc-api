import mongoose from 'mongoose';

export const connectViaMongoose = (): void => {
    mongoose.connect(process.env.DB_HOST, { dbName: process.env.DB_NAME, pass: process.env.DB_PASS, user: process.env.DB_USER });
}