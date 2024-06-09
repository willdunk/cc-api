import { Schema, model, } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { User } from './user';

const COLLECTION_NAME = 'listing';

export type ExternalListingLink = {
    _id: string;
    provider: string;
    url: string;
}

const externalListingLink = new Schema<ExternalListingLink>({
    _id: {
        type: String,
        default: uuid,
    },
    provider: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true,
    }
})

export type Listing = {
    _id: string,
    userId: string,
    address: string,
    externalListingLinks?: ExternalListingLink[],
    listingDate?: Date,
    listingPrice?: number,
}

const listingSchema = new Schema<Listing>({
    _id: {
        type: String,
        default: uuid,
    },
    userId: {
        type: String,
        required: true,
        validate: {
            validator: async function (userId: string) {
                const user = await User.findById(userId);
                return user !== null;
            },
            message: 'User does not exist.',
        },
    },
    address: {
        type: String,
        required: true
    },
    externalListingLinks: {
        type: [externalListingLink],
    },
    listingDate: {
        type: Date,
    },
    listingPrice: {
        type: Number,
    }
}, { timestamps: true });

export const Listing = model<Listing>(COLLECTION_NAME, listingSchema);