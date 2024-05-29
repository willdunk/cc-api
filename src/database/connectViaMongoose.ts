import mongoose from 'mongoose';
import { isDefined } from '../utils/ts/isDefined';

export const connectViaMongoose = () => {
    if (isDefined(process.env.DATABASE_URL)) {
        return mongoose.connect(process.env.DATABASE_URL);
    }
    return Promise.reject(new Error("Cannot connect to mongo"));
}