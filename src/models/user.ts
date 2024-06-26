import { Schema, model } from 'mongoose';
import { v4 as uuid } from 'uuid';

const COLLECTION_NAME = 'user';

export type User = {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string;
    brokerLicenseNumber?: string;
};

const userSchema = new Schema<User>(
    {
        _id: {
            type: String,
            default: uuid,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        passwordHash: {
            type: String,
            required: true,
        },
        brokerLicenseNumber: {
            type: String,
        },
    },
    { timestamps: true },
);

export const User = model<User>(COLLECTION_NAME, userSchema);
