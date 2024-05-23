import mongoose from 'mongoose';
import { isDefined } from '../utils/ts/isDefined';

export const connectViaMongoose = () => {
    if (isDefined(process.env.DB_CONNECTION_STRING)) {
        return mongoose.connect(process.env.DB_CONNECTION_STRING);
    }
    return Promise.reject(new Error("Cannot connect to mongo"));
}