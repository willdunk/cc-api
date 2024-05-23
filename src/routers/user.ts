import express, { Request, Response } from 'express';
import { User } from '../models/user';
import { createNewUser } from '../modules/user/createNewUser';
import { postUserInputSchema } from '../schemas/user/postUserInputSchema';
import { authenticateUser } from '../middlewares/auth';
import { StatusCodes } from 'http-status-codes';
import { isDefined } from '../utils/ts/isDefined';
import { getUserOutputSchema } from '../schemas/user/getUserOutputSchema';
import { filterObject } from '../utils/filterObject';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    try {
        const validatedRequestBody = postUserInputSchema.validateSync(req.body);
        await createNewUser(validatedRequestBody);
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/', authenticateUser, async (req: Request, res: Response) => {
    try {
        const userId = req.userId;
        if (!isDefined(userId)) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized to view this user' });
        }
        const user = await User.findById(userId).lean().exec();
        if (!isDefined(user)) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
        }

        res.status(StatusCodes.OK).json(filterObject(user, getUserOutputSchema));

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;