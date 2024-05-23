import mongoose from 'mongoose';
import { isDefined } from '../utils/ts/isDefined';

export const connectViaMongoose = () => {
    if (isDefined(process.env.DB_HOST)) {
        return mongoose.connect(process.env.DB_HOST, { dbName: process.env.DB_NAME, pass: process.env.DB_PASS, user: process.env.DB_USER });
    }
    return Promise.reject(new Error("Cannot connect to mongo"));
}