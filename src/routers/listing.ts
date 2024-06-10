import express, { Request, Response } from 'express';
import { authenticateUser } from '../middlewares/auth';
import { StatusCodes } from 'http-status-codes';
import { isDefined } from '../utils/ts/isDefined';
import { filterObject } from '../utils/filterObject';
import asyncHandler from 'express-async-handler';
import { postListingInputSchema } from '../schemas/listing/postListingInputSchema';
import { createNewListing } from '../modules/listing/createNewListing';
import { Listing } from '../models/listing';
import { getListingOutputSchema } from '../schemas/listing/getListingOutputSchema';

const router = express.Router();

router.post('/', authenticateUser, asyncHandler(async (req: Request, res: Response) => {
    try {
        const userId = req.userId;
        if (!isDefined(userId)) {
            res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized to add a listing to this user' });
            return;
        }
        const validatedRequestBody = postListingInputSchema.validateSync(req.body);
        const bodyWithUserId = { ...validatedRequestBody, userId };
        await createNewListing(bodyWithUserId);
        res.status(201).json({ message: 'Listing created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}));

router.get('/:userId', asyncHandler(async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const listings = await Listing.find({userId}).lean().exec();
        if (!isDefined(listings)) {
            res.status(StatusCodes.NOT_FOUND).json({ message: 'Listings not defined' });
            return;
        }
        res.status(StatusCodes.OK).json(listings.filter((listing) => filterObject(listing, getListingOutputSchema)));
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}));

router.get('/:userId/:listingId', asyncHandler(async (req: Request, res: Response) => {
    try {
        const {userId, listingId} = req.params;
        const listing = await Listing.findOne({userId, _id: listingId}).lean().exec();
        if (!isDefined(listing)) {
            res.status(StatusCodes.NOT_FOUND).json({ message: 'Listing not found' });
            return;
        }
        res.status(StatusCodes.OK).json(filterObject(listing, getListingOutputSchema));
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}));

export default router;